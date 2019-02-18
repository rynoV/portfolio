import React, { PureComponent } from 'react'

import Transition from 'react-transition-group/Transition'

import { StyledHelpPopup } from './HelpPopupStyles'

export default class HelpPopup extends PureComponent {
  render() {
    const duration = 300
    return (
      <Transition in={this.props.active} timeout={duration} unmountOnExit>
        {state => (
          <StyledHelpPopup state={state} duration={duration}>
            <ul>
              <li>
                Scroll sideways or use the left/right arrow keys to scroll right
                and left.
              </li>
              <li>
                Scroll up or press the up/down arrow keys to cycle through
                slides.
              </li>
            </ul>
          </StyledHelpPopup>
        )}
      </Transition>
    )
  }
}
