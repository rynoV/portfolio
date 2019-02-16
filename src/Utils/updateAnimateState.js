/**
 * Bind this function to 'this' of component. 'this' must possess state with the passed stateKey.
 *
 * Updates the state while requesting animation frames.
 *
 * State will be used as a boolean and updated to match the animCondition.
 *
 * Set state to null and check that condition in your css to avoid initial animation.
 * @param {String} stateKey: a string representing the property key in state to be checked and updated
 * @param {Boolean} animCondition: an expression that evaluates to true when the state should be updated to true
 */
export default function updateAnimateState(stateKey, animCondition) {
  if (!this) throw new Error('You did not bind.')

  if (!this.state) throw new Error('Bound context does not possess state')

  if (!this.state.hasOwnProperty(stateKey))
    throw new Error(`State does not have property key ${stateKey}.`)

  const stateBool = this.state[stateKey]

  if (animCondition && stateBool === null)
    window.requestAnimationFrame(() => {
      this.setState({ [stateKey]: true })
    })
  else if (
    stateBool !== null &&
    ((animCondition && !stateBool) || (!animCondition && stateBool))
  )
    window.requestAnimationFrame(() => {
      this.setState(state => ({ [stateKey]: !state[stateKey] }))
    })
}
