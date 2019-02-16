/**
 * For each refName passed, sets this[refName] to its value from context's refs.
 * * Initialize class-wide constants before awaiting this function.
 * @param  {...refKeys Object keys} refNames: any length of refKeys keys
 */
export default async function initializeRefs(...refNames) {
  const { context } = this
  for (const refName of refNames) {
    if (context.refs.hasOwnProperty(refName)) {
      const { [refName]: ref } = await context.getRefsProm.bind(this, refName)()
      this[refName] = ref
    }
  }
}
