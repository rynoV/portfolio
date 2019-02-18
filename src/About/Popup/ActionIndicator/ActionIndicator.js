import React, { PureComponent } from 'react'

import Help from './Help/Help'
import {
  StyledActionIndicator,
  Arrow,
  ArrowWrapper,
} from './ActionIndicatorStyles'

import rightArrow from '../../../images/right_arrow.svg'

export default class ActionIndicator extends PureComponent {
  render() {
    return (
      <StyledActionIndicator>
        <Help />
        <ArrowWrapper>
          <Arrow src={rightArrow} alt="Arrow icon" />
        </ArrowWrapper>
      </StyledActionIndicator>
    )
  }
}
