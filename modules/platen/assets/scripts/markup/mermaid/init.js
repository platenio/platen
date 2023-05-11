{{- $Params          := .                                              -}}
{{- $Config          := $Params.Config                                 -}}
{{- $LibraryURL      := $Params.LibraryUrl                             -}}
{{- $PlatenModule    := partialCached "platen/utils/getModule" $Params -}}

// We import mermaid from the defined URL instead of constructing it here.
import mermaid from '{{ $LibraryURL }}'
import * as platen  from '{{ $PlatenModule.RelPermalink }}'

/**
 * The `mermaidConfig` is pulled from the sites assets so users can override the
 * module's defaults with their own.
 */
const mermaidConfig = {{ $Config }}

/**
 * We only initialize mermaid after the page has fully loaded to prevent any weird
 * hiccups with dynamic elements and web components.
 */
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    console.log("Initilizing mermaid");
    mermaid.initialize(mermaidConfig);
  }
};

/**
 * The `renderMermaid` function should only be called when the element is visible.
 * It uses mermaid to render the element's text definition into an SVG and replaces
 * the element's innerHTML with the rendered chart.
 * 
 * @param {*} element The element to render with mermaid.
 */
async function renderMermaid(element) {
  // Get the contents of the Mermaid element
  let html = element.textContent;

  // Generate a unique-ish ID so we don't clobber existing graphs
  // This is definitely quick and dirty and could be improved to 
  // avoid collisions when many charts are used
  let id = 'graph-' + Math.floor(Math.random() * Math.floor(1000));

  // Actually render the chart
  const { svg, bindFunctions } =  await mermaid.render(id, html, element)
  element.innerHTML = svg
  if (bindFunctions) {
    bindFunctions(element);
  }
  window.diagrams.push(document.querySelector(`#${id}`))
}

window.diagrams = []

// This grabs all of the mermaid diagrams on the page and registers an observer to
// wait until the element becomes visible to render the diagram.
document.querySelectorAll(".mermaid").forEach(function(el) {
  platen.onFirstVisible(el, async () => renderMermaid(el))
})
