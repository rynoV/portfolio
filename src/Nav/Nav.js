import React, { PureComponent } from 'react'

import { StyledNav, Icon, Button } from './NavStyles'

import hamburger from '../images/menu_icon_translucent.svg'
import NavList from './NavList/NavList'

export default class Nav extends PureComponent {
  state = {
    expanded: false,
  }

  render() {
    const { expanded } = this.state

    return (
      <StyledNav
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
      >
        <Button onClick={this.handleClick}>
          <Icon src={hamburger} alt="Menu icon" expanded={expanded} />
        </Button>
        <NavList expanded={expanded} />
      </StyledNav>
    )
  }

  handleClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleMouseOver = () => {
    this.setState({ expanded: true })
  }

  handleMouseLeave = () => {
    this.setState({ expanded: false })
  }

  handleFocus = () => {
    this.setState({ expanded: true })
  }
}
