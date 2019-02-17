import React, { PureComponent } from 'react'
import { StyledProjectsListItem, ProjectsList } from './ProjectsListItemStyles'
import { refKeys } from '../../../Context/context'

import { projectsList } from '../../../Projects/ProjectsPanel/projectsList'
import NavLink from '../../NavLink/NavLink'

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
        <ProjectsList hovered={this.state.hovered}>
          {projectsList.map(({ name }, index) => (
            <li key={name}>
              <NavLink
                component={refKeys.projectContainers}
                index={index}
                linkID={`#${name}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ProjectsList>
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
