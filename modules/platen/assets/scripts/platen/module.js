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

const Version = '0.1.0'

export default Version
