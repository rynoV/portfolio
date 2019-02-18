import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { StyledInitialAvatar, Button } from './InitialAvatarStyles'

import { stages, Progress } from '../../Context/context'

import Transition from 'react-transition-group/Transition'

import avatar_standing from '../../images/avatar_standing.png'

export default class InitialAvatar extends PureComponent {
  static propTypes = {}
  static contextType = Progress

  state = {
    show: true,
  }

  handleClick = () => {
    this.setState({ show: false })
  }

  updateStage = () => {
    this.context.updateStage(stages.aboutPopup)
  }

  render() {
    const duration = 250
    return (
      this.context.stage === stages.initial && (
        <Transition
          in={this.state.show}
          timeout={duration}
          onExited={this.updateStage}
          unmountOnExit
        >
          {state => (
            <Button
              tabIndex="1"
              onClick={this.handleClick}
              mountState={state}
              duration={duration}
            >
              <StyledInitialAvatar
                src={avatar_standing}
                alt="Pixel Avatar of Calum Sieppert"
              />
            </Button>
          )}
        </Transition>
      )
    )
  }
}
