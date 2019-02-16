export function setPanelIndex(newIndex) {
  this.setState(({ progressContext }) => ({
    progressContext: {
      panelIndex: newIndex,
      stage: progressContext.stage,
      updateStage: progressContext.updateStage,
    },
  }))
}
