const tabGroups = document.querySelectorAll('sl-tab-group');

tabGroups.forEach(tabGroup => {
  tabGroup.addEventListener('sl-close', async event => {
    const tab = event.target;
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
  
    // Remove the tab + panel
    tab.remove();
    panel.remove();
  });
});
