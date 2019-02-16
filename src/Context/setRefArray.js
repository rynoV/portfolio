/**
 * Creates an empty array in context if it has not yet been created
 * Adds the passed ref to the array
 * Intended to be bound to context provider component in constructor
 * Use in cDM instead of the ref callback to ensure elements are not added on update (See Project for example)
 * @param {refKeys property} refArrayName
 * @param {Component instance or DOM element reference} ref
 */
export default function setRefArray(refArrayName, ref) {
  if (this.state.refsContext.refs[refArrayName] === null)
    this.state.refsContext.refs[refArrayName] = []
  this.state.refsContext.refs[refArrayName] = [
    ...this.state.refsContext.refs[refArrayName],
    ref,
  ]
}
