import React, { PureComponent } from 'react'

import Transition from 'react-transition-group/Transition'
import NavLink from '../../../NavLink/NavLink'

import { StyledProjectsList } from './ProjectsListStyles'

import { refKeys } from '../../../../Context/context'
import { projectsList } from '../../../../Projects/ProjectsPanel/projectsList'

export default class ProjectsList extends PureComponent {
  render() {
    const { hovered } = this.props
    const duration = 200

    return (
      <Transition in={hovered} timeout={duration} unmountOnExit>
        {state => (
          <StyledProjectsList
            state={state}
            hovered={hovered}
            duration={duration}
          >
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
          </StyledProjectsList>
        )}
      </Transition>
    )
  }
}
