import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import AboutPanelContainer from '../About/Panel/AboutPanelContainer'
import ProjectsPanelContainer from '../Projects/ProjectsPanel/ProjectsPanelContainer'
import ContactPanelContainer from '../Contact/Panel/ContactPanelContainer'
import Overlay from '../Overlay/Overlay'

import '../App.css'

export default class Page extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <>
        <Overlay />
        <AboutPanelContainer />
        <ProjectsPanelContainer />
        <ContactPanelContainer />
      </>
    )
  }
}
