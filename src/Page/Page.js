import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import AboutPanelContainer from '../About/Panel/AboutPanelContainer'
import ProjectsPanelContainer from '../Projects/ProjectsPanel/ProjectsPanelContainer'
import ContactPanelContainer from '../Contact/Panel/ContactPanelContainer'
import Nav from '../Nav/Nav'

import '../App.css'
import '../normalize.css'

import { Refs } from '../Context/context'

export default class Page extends PureComponent {
  static propTypes = {}
  static contextType = Refs

  render() {
    return (
      <>
        <Nav />
        <AboutPanelContainer />
        <ProjectsPanelContainer />
        <ContactPanelContainer />
      </>
    )
  }
}
