import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  StyledInitialAvatar,
  Button,
  SpeechBubble,
  Wrapper,
} from './InitialAvatarStyles'

import { stages, Progress } from '../../Context/context'

import Transition from 'react-transition-group/Transition'

import avatar_standing from '../../images/avatar_standing.png'

export default class InitialAvatar extends PureComponent {
  static propTypes = {}
  static contextType = Progress

  state = {
    show: true,
    unmounted: false,
  }

  render() {
    const duration = 250

    const { stage } = this.context
    const { show, unmounted } = this.state

    let inBool

    /**
     * We set unmounted to true on exit after setting show on click.
     * When the component is unmounted, we want to mount it on stage update, but when it is mounted we want to unmount it on click then update the stage at the last moment so that other components don't start their onmount animation before this one's animation is finished.
     */
    if (!unmounted) inBool = show
    else if (unmounted) inBool = stage === stages.initial

    return (
      <Transition
        in={inBool}
        timeout={duration}
        onExited={this.handleExit}
        onEntered={this.handleEnter}
        unmountOnExit
        mountOnEnter
      >
        {state => (
          <Wrapper mountState={state} duration={duration}>
            <SpeechBubble>
              <p>Click me!</p>
            </SpeechBubble>

            <Button tabIndex="1" onClick={this.startUnmount}>
              <StyledInitialAvatar
                src={avatar_standing}
                alt="Pixel Avatar of Calum Sieppert"
              />
            </Button>
          </Wrapper>
        )}
      </Transition>
    )
  }

  handleExit = () => {
    this.setState({ unmounted: true })
    this.context.updateStage(stages.aboutPopup)
  }

  handleEnter = () => {
    this.setState({ show: true, unmounted: false })
  }

  startUnmount = () => {
    this.setState({ show: false })
  }
}
