import React from 'react'

export const stagesArr = ['initial', 'aboutPopup', 'projects']
/**
 * Single source of truth for stage state names
 */
export const stages = {}

for (const stage of stagesArr) {
  stages[stage] = stage
}

export const refKeysArr = [
  'projectsAvComp',
  'popupAvComp',
  'contactAvComp',
  'projectFigureComps',
  'aboutContainer',
  'contactContainer',
  'pageContainer',
  'projectsContainer',
  'projectsAvatar',
  'popupAvatar',
  'speechBubbleComp',
  'speechBubbleContainer',
  'projectContainers',
  'projectFigures',
]

/**
 * Used to provide names for setting and getting ref values
 * Single source of truth for refKeys
 */
export const refKeys = {}

for (const refKey of refKeysArr) {
  refKeys[refKey] = refKey
}

/**
 * Initialize and fill refs object using refKeys as keys and null as values
 * To be used as a default value for context.refs
 * Allows us to have a single source of truth regarding references to the refs throughout the app
 */
export const nullRefs = {}

for (const refKey in refKeys) {
  if (refKeys.hasOwnProperty(refKey)) {
    nullRefs[refKey] = null
  }
}

export const Refs = React.createContext({
  refs: nullRefs,
  setRef: () => {},
  setRefArray: () => {},
  getRefsProm: () => {},
})

export const Progress = React.createContext({
  panelIndex: 0,
  stage: stages.initial,
  updateStage: () => {},
})
