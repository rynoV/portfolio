/**
 * Intended to be bound to context provider component in constructor
 * @param {refKeys property} refArrayName
 * @param {Component instance or DOM element reference} ref
 */
export default function setRef(refKey, ref) {
  this.state.refsContext.refs[refKey] = ref
}
