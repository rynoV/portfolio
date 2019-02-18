import React, { Component } from 'react'

import {
  HelpIconWrapper,
  HelpIcon,
  HelpWrapper,
  HelpButton,
} from './HelpStyles'

import helpIcon from '../../../../images/help_icon.png'
import HelpPopup from './Popup/HelpPopup'

export default class Help extends Component {
  state = {
    active: false,
  }

  render() {
    return (
      <HelpWrapper>
        <HelpIconWrapper>
          <HelpButton>
            <HelpIcon src={helpIcon} alt="Help icon" onClick={this.toggle} />
          </HelpButton>
        </HelpIconWrapper>
        <HelpPopup active={this.state.active} />
      </HelpWrapper>
    )
  }

  toggle = () => {
    this.setState(state => ({
      active: !state.active,
    }))
  }
}
