import React, { memo } from 'react'
import PropTypes from 'prop-types'

import AboutPopupContainer from '../Popup/AboutPopupContainer'
import AboutNav from '../Nav/AboutNav'
import InitialAvatar from '../../Avatar/Initial/InitialAvatar'

import { StyledAbout } from './AboutPanelStyles'

import { Refs, refKeys } from '../../Context/context'

function AboutPanel() {
  return (
    <Refs.Consumer>
      {context => (
        <StyledAbout
          id="about"
          ref={el => context.setRef(refKeys.aboutContainer, el)}
        >
          <AboutPopupContainer />
          <AboutNav />
          <InitialAvatar />
        </StyledAbout>
      )}
    </Refs.Consumer>
  )
}

AboutPanel.propTypes = {}

export default memo(AboutPanel)
