import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Transition from 'react-transition-group/Transition'

import { StyledPopup, PopupContainer, Info } from './AboutPopupStyles'
import { Frame } from '../../Avatar/Popup/PopupAvatarStyles'

import PopupAvatar from '../../Avatar/Popup/PopupAvatar'

import { Refs, refKeys, stagesArr, stages } from '../../Context/context'

export default class AboutPopup extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    stage: PropTypes.oneOf(stagesArr),
  }

  static contextType = Refs

  state = {
    show: false,
    unmounted: true,
  }

  render() {
    const duration = 250

    const { stage } = this.props.progressContext
    const { show, unmounted } = this.state

    let inBool
    /**
     * We set unmounted to true on exit after setting show on escape key press.
     * When the component is unmounted, we want to mount it on stage update, but when it is mounted we want to unmount it on escape key press then update the stage at the last moment so that other components don't start their onmount animation before this one's animation is finished.
     */
    if (!unmounted) inBool = show
    else if (unmounted) inBool = stage === stages.aboutPopup

    return (
      <Transition
        in={inBool}
        timeout={duration}
        onEnter={this.handleEnter}
        onExited={this.handleExit}
        unmountOnExit
        mountOnEnter
      >
        {state => (
          <PopupContainer>
            <StyledPopup mountState={state} duration={duration}>
              <Frame>
                <PopupAvatar
                  ref={el => this.context.setRef(refKeys.popupAvComp, el)}
                />
              </Frame>
              <Info tabIndex="0">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Info>
            </StyledPopup>
          </PopupContainer>
        )}
      </Transition>
    )
  }

  componentDidMount() {
    this.context.setRef(refKeys.aboutPopupComp, this)
  }

  handleExit = () => {
    this.setState({ unmounted: true })
    this.props.progressContext.updateStage(stages.initial)
  }

  handleEnter = () => {
    this.setState({ show: true, unmounted: false })
  }

  handleEscapeKey = () => {
    this.setState({ show: false })
  }
}
