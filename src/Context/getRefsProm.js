/**
 * Must be bound to current component
 * Sometimes we cannot access context refs synchronously, so this returns a promise with an object containing refKeys and their values from the context
 * Tries to get a value from context.refs for each refKey recursively.
 * @param {refKeys property value(s)} refKeys: Any length of refKeys object properties
 */
export default async function getRefsProm(...refKeys) {
  if (!this) {
    throw new Error('You forgot to bind')
  }

  const noPropErrorMessage = refKey => {
    return `context.refs did not have property '${refKey}'.`
  }

  const { refs } = this.context

  const wait = new Promise(resolve => {
    setTimeout(resolve, 0.000000001)
  })

  const getRef = refKey => {
    let counter = 0

    const checkForRef = async function(refKey) {
      if (refs.hasOwnProperty(refKey)) {
        const ref = refs[refKey]

        if (ref === null) {
          await wait

          counter++

          if (counter < 50) return checkForRef(refKey)
          else
            throw new Error(
              `checkForRef was called more than 50 times looking for ${refKey}`
            )
        } else {
          return ref
        }
      } else throw new Error(noPropErrorMessage(refKey))
    }
    return checkForRef(refKey)
  }

  let refObj = {}
  for (const refKey of refKeys) {
    const ref = await getRef(refKey)
    refObj[refKey] = ref
  }
  return refObj
}
