/**
 * standardizeHeight iterates over the tab groups, setting the minimum height
 * for each group to minimize the repaint and layout shifting when switching
 * between tabs.
 * 
 * @param {Element} groups the list of tab groups to standardize.
 */
async function standardizePlatenTabHeight(groups) {
  for (const group of groups) {
    let height = await getStandardPlatenTabHeight(group)
    group.body.style.minHeight = height + 'px'
  }
}

/**
 * getStandardHeight checks the height of every panel in a tab group, returning
 * the offsetHeight of the tallest panel. To do so, it activates each panel in
 * turn, resetting the group afterward.
 * 
 * @param {Element} group The group to get the standard height for.
 * @returns the offsetHeight of the tallest panel in pixels.
 */
async function getStandardPlatenTabHeight(group) {
  var standardHeight = group.body.offsetHeight
  let panels = group.querySelectorAll('sl-tab-panel')
  for (const panel of panels) {
    panel.active = true
    await panel.updateComplete.then(() => {
        let height = group.body.offsetHeight
        if (height > standardHeight) {
            standardHeight = height
        }
        panel.active = false
    })
    await panel.updateComplete
  }
  
  panels[0].active = true
  await panels[0].updateComplete

  return standardHeight
}

// The tab handler waits until the tab web components are all defined on the page.
await Promise.allSettled([
  customElements.whenDefined('sl-tab-group'),
  customElements.whenDefined('sl-tab'),
  customElements.whenDefined('sl-tab-panel')
])

// Retrieve the tab groups from the page
const tabGroups               = document.querySelectorAll('sl-tab-group');
const standardHeightTabGroups = tabGroups.filter(
  group => group.dataset.standardizeHeight == true
);

// Standardize the height for every tab group.
await standardizePlatenTabHeight(standardHeightTabGroups)

// Add a handler for closing tabs to every tab group.
tabGroups.forEach(tabGroup => {
  tabGroup.addEventListener('sl-close', async event => {
    const tab   = event.target;
    const panel = tabGroup.querySelector(`sl-tab-panel[name="${tab.panel}"]`);
  
    // Show the previous tab if the tab is currently active
    if (tab.active) {
      let replacementTab = tab.previousElementSibling?.previousElementSibling
      if (replacementTab == null) {
        replacementTab = tab.nextElementSibling?.nextElementSibling
      }
      if (replacementTab != null) {
        tabGroup.show(replacementTab.panel);
      }
    }
  
    // Remove the tab and panel
    tab.remove();
    panel.remove();
  });
});
