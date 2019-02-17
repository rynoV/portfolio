import React, { PureComponent } from 'react'

import Transition from 'react-transition-group/Transition'
import NavLink from '../NavLink/NavLink'

import { StyledNavList } from './NavListStyles'

import { refKeys } from '../../Context/context'
import ProjectsListItem from './ProjectsListItem/ProjectsListItem'

export default class NavList extends PureComponent {
  render() {
    const { expanded } = this.props

    const duration = 200

    return (
      <Transition in={expanded} timeout={duration} unmountOnExit>
        {state => (
          <StyledNavList state={state} duration={duration}>
            <li>
              <NavLink component={refKeys.aboutContainer} linkID="about">
                About
              </NavLink>
            </li>
            <ProjectsListItem />
            <li>
              <NavLink component={refKeys.contactContainer} linkID="contact">
                Contact
              </NavLink>
            </li>
          </StyledNavList>
        )}
      </Transition>
    )
  }
}
