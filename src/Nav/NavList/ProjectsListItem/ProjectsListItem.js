import React, { PureComponent } from 'react'
import { StyledProjectsListItem } from './ProjectsListItemStyles'
import { refKeys } from '../../../Context/context'

import NavLink from '../../NavLink/NavLink'
import ProjectsList from './ProjectsList/ProjectsList'

export default class ProjectsListItem extends PureComponent {
  state = {
    active: false,
  }

  render() {
    return (
      <StyledProjectsListItem
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <NavLink component={refKeys.projectsContainer} linkID="projects">
          Projects
        </NavLink>
        <ProjectsList hovered={this.state.active} />
      </StyledProjectsListItem>
    )
  }

  handleMouseOver = () => {
    this.setState({ active: true })
  }

  handleMouseLeave = () => {
    this.setState({ active: false })
  }

  handleFocus = () => {
    this.setState({ active: true })
    clearTimeout(this.waitForFocusLeave)
  }

  handleBlur = () => {
    this.waitForFocusLeave = setTimeout(() => {
      this.setState({ active: false })
    }, 10)
  }
}
