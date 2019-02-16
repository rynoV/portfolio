/**
 * Intended to be bound to context provider component in constructor
 * @param {stages object property} stageName
 */
export default function updateStage(stageName) {
  this.setState({
    progressContext: { stage: stageName, updateStage: this.updateStage },
  })
}
