import React, { PureComponent } from 'react'

import { StyledOverlay } from './OverlayStyles'
import Nav from './Nav/Nav'
import Arrows from './Arrows/Arrows'
import Help from './Help/Help'

export default class Overlay extends PureComponent {
  render() {
    return (
      <StyledOverlay>
        <Nav />
        <Help />
        <Arrows />
      </StyledOverlay>
    )
  }
}
