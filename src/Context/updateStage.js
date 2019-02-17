/**
 * Intended to be bound to context provider component in constructor
 * @param {stages object property} stageName
 */
export default function updateStage(stageName) {
  this.setState(state => ({
    progressContext: {
      panelIndex: state.progressContext.panelIndex,
      stage: stageName,
      updateStage: state.progressContext.updateStage,
    },
  }))
}
