/**
 * The `onFirstVisible` function is used to trigger a callback on an element
 * when the element first becomes visible on the page. This is useful for
 * things like Mermaid, which can mis-render elements if called while they're
 * not visible.
 * 
 * The callback can only take the element as its input.
 * 
 * @param {*} element The element to watch for visibility.
 * @param {*} callback The function to execute when the element becomes visible.
 */
export function onFirstVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

const SiteMenuControlID                    = 'menu-control'
const TableOfContentsControlID             = 'toc-control'
const PlatenDisplayModeSelectorID          = 'platen-display-mode-selector'
const ShoelaceDisplayModeSelectorListeners = [
  {
    name: 'sl-change',
    listener: (event) => {
      let newMode = event.target.value
      console.log(`Mode changed to ${newMode}`)
      let isValidMode = ['light', 'dark', 'auto'].includes(newMode)
      if (isValidMode) {
        console.log(`setting display mode selector to ${newMode}`)
        setCurrentThemeMode(newMode)
      }
    }
  },
  {
    name: 'sl-clear',
    listener: (event) => {
      let newMode = getDefaultThemeMode()
      console.log(`clearing display mode selector, setting to ${newMode}`)
      setCurrentThemeMode(newMode)
    }
  }
]

export function getDefaultThemeMode() {
  return document.documentElement.dataset.defaultThemeMode
}

/**
 * The getCurrentThemeMode function returns the current theme mode for the site,
 * as defined by the 'platen-theme-mode-*' class on the html element. The
 * returned object has two properties. The name property is the name of the
 * mode, while the class property is the full class name.
 * 
 * @returns {object} The current theme mode, or undefined if it can't be found.
 */
export function getCurrentThemeMode() {
  let current = undefined
  document.documentElement.classList.forEach(c => {
    if (c.startsWith('platen-theme-mode-')) {
      current = {
        name: c.slice(18),
        class: c
      }
    }
  })

  return current
}

/**
 * The toThemeModeClass function converts a theme mode name to the class name
 * used by Platen.
 * 
 * @param {string} mode The mode to convert to a class name.
 * @returns 
 */
export function toThemeModeClass(mode) {
  return `platen-theme-mode-${mode}`
}

/**
 * The setCurrentThemeMode function sets the theme mode for the site. It
 * replaces the current theme mode class on the html element with the new one,
 * if needed. If the mode is changed, it also dispatches a custom event,
 * 'platen-theme-mode-changed', with the old and new modes as the event detail.
 * 
 * @param {string} mode The mode to set the site to.
 */
export function setCurrentThemeMode(mode) {
  let current = getCurrentThemeMode()
  let target  = toThemeModeClass(mode)
  if (current.class != target) {
    console.log(`replacing ${current.class} with ${target}`)
    document.documentElement.classList.replace(current.class, target)
    saveThemeMode(mode)
    const event = new CustomEvent('platen-theme-mode-changed', {
      detail: {
        newMode: mode,
        oldMode: current.name
      }
    })
    document.documentElement.dispatchEvent(event)
  }
}

/**
 * The getSavedThemeMode function returns the saved theme mode for the site,
 * as stored in local storage. This is used to persist the theme mode across
 * page loads.
 * 
 * @returns The saved theme mode, or undefined if it can't be found.
 */
export function getSavedThemeMode() {
  return localStorage.getItem('platen-theme-mode')
}

/**
 * The saveThemeMode function saves the theme mode for the site to local
 * storage. This is used to persist the theme mode across page loads.
 * 
 * @param {string} mode The mode to save to local storage.
 */
export function saveThemeMode(mode) {
  localStorage.setItem('platen-theme-mode', mode)
}

/**
 * The getSiteMenuControl function returns the site menu control element,
 * searching for it by ID. This makes it usable across the legacy and Shoelace
 * layout templates.
 * 
 * @returns The site menu control element.
 */
export function getSiteMenuControl() {
  return document.getElementById(SiteMenuControlID)
}

/**
 * The getTableOfContentsControl function returns the table of contents control
 * element, searching for it by ID. This makes it usable across the legacy and
 * Shoelace layout templates.
 * 
 * @returns The table of contents control element.
 */
export function getTableOfContentsControl() {
  return document.getElementById(TableOfContentsControlID)
}

/**
 * 
 * @returns the selector element for the display mode selector, searching for
 * it by ID. This makes it usable across the legacy and Shoelace layout
 * templates.
 * 
 * @returns The display mode selector element.
 */
export function getDisplayModeSelector() {
  return document.getElementById(PlatenDisplayModeSelectorID)
}

/**
 * The registerDisplayModeSelectorListeners function registers the event
 * listeners for the display mode selector. This is used to update the theme
 * mode when the selector is changed.
 * 
 * Currently, it only supports the experimental shoelace select element. This
 * will be expanded to support the legacy select element as well.
 * 
 * @returns None.
 */
export function registerDisplayModeSelectorListeners() {
  let selector = getDisplayModeSelector()
  if (selector == undefined) {
    return
  }

  if (selector.tagName == 'SL-SELECT') {
    ShoelaceDisplayModeSelectorListeners.forEach(l => {
      selector.addEventListener(l.name, l.listener)
    })
  }
}

/**
 * Shoelace's mode toggle only handles light, dark, and auto. Any custom values
 * are ignored. This function checks if a mode is a valid shoelace mode.
 * 
 * @param {string} mode The mode to check.
 * @returns boolean True if the mode is a valid shoelace mode, false otherwise.
 */
export function isValidShoelaceMode(mode) {
  return ['light', 'dark', 'auto'].includes(mode)
}

/**
 * The initializeThemeMode function initializes the theme mode for the site
 * when the page loads. It checks to see if the theme mode has been saved to
 * local storage. If it has, it sets the theme mode to the saved value. If it
 * hasn't, it sets the theme mode to the default value and saves the default.
 * 
 * This function also registers the event listeners for the display mode
 * selector and ensures the selector's value is set to the saved theme mode.
 * 
 * This ensures that the theme mode is persisted across page loads.
 */
export function initializeThemeMode() {
  let initialTheme = getCurrentThemeMode().name
  let savedTheme   = getSavedThemeMode()

  registerDisplayModeSelectorListeners()

  if (savedTheme == undefined) {
    saveThemeMode(initialTheme)
  } else if (savedTheme != initialTheme) {
    if (isValidShoelaceMode(initialTheme)) {
      getDisplayModeSelector().value = savedTheme
    }

    setCurrentThemeMode(savedTheme)
  }
}

/**
 * The showSiteMenu function shows the site menu by checking the site menu
 * control element.
 */
export function showSiteMenu() {
  getSiteMenuControl().checked = true
}

/**
 * The hideSiteMenu function hides the site menu by unchecking the site menu
 * control element.
 */
export function hideSiteMenu() {
  getSiteMenuControl().checked = false
}

/**
 * The toggleTableOfContents function toggles the table of contents visibility
 * by checking or unchecking the control element.
 */
export function toggleTableOfContents() {
  let toc = getTableOfContentsControl()
  if (toc.checked != true) {
    toc.checked = true
  } else {
    toc.checked = false
  }
}

/**
 * The `stopPropagationInTree` function is used to keep intentional interactive events in a
 * Shoelace tree-item from bubbling up and causing the parent tree item to collapse or expand.
 * 
 * This is particularly useful for trees that include several interactive objects, like the trees
 * for the Table of Contents links.
 * 
 * This function must be called once against each tree you want to prevent propagation in. Every
 * found element matching the targetSelector in that tree is set to stop the event propagation for
 * events with the specified type.
 * 
 * To stop propagation for multiple events or trees, call the function for each event and tree.
 * 
 * @param {string} targetSelector The CSS selector string for the interactive object to target.
 * @param {string} treeSelector The CSS selector string for the Shoelace tree the target is in.
 * @param {string} eventType  The type of event to stop propagation for.
 */
export async function stopPropagationInTree(targetSelector, treeSelector = 'sl-tree', eventType = 'click') {
  customElements.whenDefined('sl-tree').then(async () => {
    const tree = document.querySelector(treeSelector)

    if (tree != undefined) await tree.updateComplete;

    document.querySelectorAll(targetSelector).forEach(element => {
      element.addEventListener(
        eventType,
        event => { event.stopPropagation() },
        true
      )
    })
  })
}

/**
 * The `Version` constant is used to track the version of the Platen module.
 */
export const Version = '0.2.0'

export default Version

// Initialize the theme mode.
initializeThemeMode()
