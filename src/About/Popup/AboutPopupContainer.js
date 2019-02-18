import React, { PureComponent } from 'react'

import AboutPopup from './AboutPopup'

import { Progress } from '../../Context/context'
export default class AboutPopupContainer extends PureComponent {
  static contextType = Progress

  render() {
    return <AboutPopup progressContext={this.context} />
  }
}
