import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { StyledPopup, PopupContainer, Info } from './AboutPopupStyles'
import PopupAvatar from '../../Avatar/Popup/PopupAvatar'
import { Refs, refKeys, stagesArr, stages } from '../../Context/context'
import { Frame } from '../../Avatar/Popup/PopupAvatarStyles'

export default class AboutPopup extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    stage: PropTypes.oneOf(stagesArr),
  }

  static contextType = Refs

  render() {
    const { handleClick, stage } = this.props

    return (
      stage !== stages.initial && (
        <PopupContainer>
          <StyledPopup>
            <Frame>
              <PopupAvatar
                ref={el => this.context.setRef(refKeys.popupAvComp, el)}
              />
            </Frame>
            <Info>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Info>
            <button onClick={handleClick}>Next</button>
          </StyledPopup>
        </PopupContainer>
      )
    )
  }
}
