import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectFigure from './Figure/Figure'

import { StyledProjectPanel } from './PanelStyles'
import { Refs, refKeys } from '../../Context/context'

export default class ProjectPanel extends Component {
  static propTypes = {
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    description: PropTypes.string,
  }

  static contextType = Refs

  render() {
    const { name, imgSrc, imgAlt, description, index } = this.props

    return (
      <StyledProjectPanel tabIndex="0" ref={el => (this.container = el)}>
        <ProjectFigure
          name={name}
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          description={description}
          index={index}
        />
      </StyledProjectPanel>
    )
  }

  componentDidMount() {
    this.context.setRefArray(refKeys.projectContainers, this.container)
  }
}
