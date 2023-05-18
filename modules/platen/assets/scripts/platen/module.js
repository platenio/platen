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

const SiteMenuControlID = 'menu-control'
const TableOfContentsControlID = 'toc-control'

export function getSiteMenuControl() {
  return document.getElementById(SiteMenuControlID)
}

export function getTableOfContentsControl() {
  return document.getElementById(TableOfContentsControlID)
}

export function showSiteMenu() {
  console.log('showing site menu')
  getSiteMenuControl().checked = true
}

export function hideSiteMenu() {
  getSiteMenuControl().checked = false
}

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

export const Version = '0.1.0'

export default Version
