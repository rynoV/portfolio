import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Refs, refKeysArr, refKeys } from '../../Context/context'

import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'

export default class NavLink extends Component {
  static contextType = Refs

  static propTypes = {
    component: PropTypes.oneOf(refKeysArr),
    linkID: PropTypes.string,
    index: PropTypes.number,
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
      refKeys.pageContainer,
      refKeys.projectFigureComps
    )()
  }

  handleClick = e => {
    e.preventDefault()

    this.projectFigureComps.forEach(figureComp => {
      figureComp.setQuickScroll()
    })

    const { component, index } = this.props

    const componentRef =
      index != null ? this[component][index] : this[component]

    const { pageContainer } = this

    pageContainer.scrollTo({
      top: 0,
      left: getOffsetLeft(componentRef, pageContainer),
      behavior: 'smooth',
    })
  }
}
