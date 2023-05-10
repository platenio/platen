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

export const Version = '0.1.0'

export default Version
