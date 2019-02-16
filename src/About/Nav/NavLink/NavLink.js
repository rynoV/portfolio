import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Refs, refKeysArr, refKeys } from '../../../Context/context'

import initializeRefs from '../../../Utils/initializeRefs'
import getOffsetLeft from '../../../Utils/getOffsetLeft'

export default class NavLink extends Component {
  static contextType = Refs

  static propTypes = {
    component: PropTypes.oneOf(refKeysArr),
    linkID: PropTypes.string,
  }

  render() {
    const { linkID } = this.props

    return (
      <a onClick={this.handleClick} href={`#${linkID}`}>
        {this.props.children}
      </a>
    )
  }

  async componentDidMount() {
    await initializeRefs.bind(
      this,
      this.props.component,
      refKeys.pageContainer
    )()
  }

  handleClick = e => {
    e.preventDefault()

    const { component } = this.props
    const { pageContainer } = this

    pageContainer.scrollTo({
      top: 0,
      left: getOffsetLeft(this[component], pageContainer),
      behavior: 'smooth',
    })
  }
}
