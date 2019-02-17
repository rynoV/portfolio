import React, { PureComponent } from 'react'

import NavLink from '../NavLink/NavLink'

import { StyledNavList } from './NavListStyles'

import { refKeys } from '../../Context/context'
import ProjectsListItem from './ProjectsListItem/ProjectsListItem'

export default class NavList extends PureComponent {
  render() {
    const { expanded } = this.props

    return (
      <StyledNavList expanded={expanded}>
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
    )
  }
}
