import React, { PureComponent } from 'react'

import { Nav } from './AboutNavStyles'
import NavLink from './NavLink/NavLink'
import { refKeys } from '../../Context/context'

export default class AboutNav extends PureComponent {
  render() {
    return (
      <Nav>
        <ul>
          <li>
            <NavLink component={refKeys.aboutContainer} linkID="about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink component={refKeys.projectsContainer} linkID="projects">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink component={refKeys.contactContainer} linkID="contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </Nav>
    )
  }
}
