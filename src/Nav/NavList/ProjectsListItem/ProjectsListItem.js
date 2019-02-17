import React, { PureComponent } from 'react'
import { StyledProjectsListItem } from './ProjectsListItemStyles'
import { refKeys } from '../../../Context/context'

import NavLink from '../../NavLink/NavLink'
import ProjectsList from './ProjectsList/ProjectsList'

export default class ProjectsListItem extends PureComponent {
  state = {
    hovered: false,
  }

  render() {
    return (
      <StyledProjectsListItem
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
      >
        <NavLink component={refKeys.projectsContainer} linkID="projects">
          Projects
        </NavLink>
        <ProjectsList hovered={this.state.hovered} />
      </StyledProjectsListItem>
    )
  }

  handleMouseOver = () => {
    this.setState({ hovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  }
}
