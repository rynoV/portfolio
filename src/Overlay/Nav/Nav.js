import React, { PureComponent } from 'react'

import { StyledNav, Icon, Button } from './NavStyles'

import hamburger from '../../images/menu_icon_translucent.svg'
import NavList from './NavList/NavList'

export default class Nav extends PureComponent {
  state = {
    active: false,
  }

  render() {
    const { active } = this.state

    return (
      <StyledNav
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        active={active}
      >
        <Button onClick={this.handleClick}>
          <Icon src={hamburger} alt="Menu icon" expanded={active} />
        </Button>
        <NavList expanded={active} />
      </StyledNav>
    )
  }

  handleClick = () => {
    this.setState(state => ({ active: !state.active }))
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

  handleKeyUp = e => {
    switch (e.key) {
    case 'Escape':
      this.setState({ active: false })
      break

    case 'Enter':
      this.setState({ active: false })
      break

    default:
      break
    }
  }
}
