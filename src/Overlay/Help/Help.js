import React, { Component } from 'react'

import {
  HelpIconWrapper,
  HelpIcon,
  HelpWrapper,
  HelpButton,
} from './HelpStyles'

import helpIcon from '../../images/help_icon.png'
import HelpPopup from './Popup/HelpPopup'

export default class Help extends Component {
  state = {
    active: false,
  }

  render() {
    return (
      <HelpWrapper>
        <HelpPopup active={this.state.active} />
        <HelpButton>
          <HelpIcon
            src={helpIcon}
            alt="Help icon"
            onClick={this.toggle}
            onMouseOver={() => console.log('over')}
            onMouseLeave={() => console.log('leave')}
          />
        </HelpButton>
      </HelpWrapper>
    )
  }

  toggle = () => {
    this.setState(state => ({
      active: !state.active,
    }))
  }

  handleMouseOver = () => {
    this.setState({ active: true })
  }

  handleMouseLeave = () => {
    this.setState({ active: false })
  }
}
