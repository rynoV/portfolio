/**
 * Returns the offset of el relative to the top level container
 * @param {DOMNode} el: the DOM node whose offsetLeft is wanted
 * @param {DOMNode} pageContainer: the container being scrolled
 */
export default function getOffsetLeft(el, pageContainer) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = pageContainer.scrollLeft

  return rect.left + scrollLeft
}
