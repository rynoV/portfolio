import React, { PureComponent } from 'react'

import AboutPopup from './AboutPopup'

import { Refs, refKeys, Progress } from '../../Context/context'

import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'

export default class AboutPopupContainer extends PureComponent {
  static contextType = Refs

  render() {
    return (
      <Progress.Consumer>
        {context => (
          <AboutPopup stage={context.stage} handleClick={this.handleClick} />
        )}
      </Progress.Consumer>
    )
  }

  async componentDidMount() {
    await initializeRefs.bind(
      this,
      refKeys.pageContainer,
      refKeys.projectsContainer
    )()
  }

  /**
   * Scroll with 'smooth behavior' to the first project panel
   */
  handleClick = () => {
    const { pageContainer, projectsContainer } = this

    if (!(pageContainer && projectsContainer)) return

    pageContainer.scrollTo({
      top: 0,
      left: getOffsetLeft(projectsContainer, pageContainer),
      behavior: 'smooth',
    })
  }
}
