import React, { PureComponent } from 'react'
import { StyledSpeechBubble } from './SpeechBubbleStyles'

import { refKeys, Refs } from '../../../Context/context'

import initializeRefs from '../../../Utils/initializeRefs'
import updateAnimateState from '../../../Utils/updateAnimateState'
import getOffsetLeft from '../../../Utils/getOffsetLeft'

export default class SpeechBubble extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      animate: null,
    }
  }

  static contextType = Refs

  render() {
    return (
      <StyledSpeechBubble
        animate={this.state.animate}
        ref={el => {
          this.context.setRef(refKeys.speechBubbleContainer, el)
          this.self = el
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </StyledSpeechBubble>
    )
  }

  async componentDidMount() {
    await initializeRefs.bind(
      this,
      refKeys.pageContainer,
      refKeys.projectContainers,
      refKeys.projectFigures
    )()

    this.initializeFromRefs()
  }

  /**
   * Called on scroll from PageContainer
   * @param {Number} scrollLeft
   */
  animate = scrollLeft => {
    const { animateBounds } = this
    const animate =
      (scrollLeft >= animateBounds[0].left &&
        scrollLeft <= animateBounds[0].right) ||
      (scrollLeft >= animateBounds[1].left &&
        scrollLeft <= animateBounds[1].right) ||
      (scrollLeft >= animateBounds[2].left &&
        scrollLeft <= animateBounds[2].right)

    updateAnimateState.bind(this, 'animate', animate)()
  }

  initializeFromRefs = () => {
    this.animateBounds = []
    this.projectContainers.forEach((container, index) => {
      this.animateBounds.push({
        left: getOffsetLeft(container, this.pageContainer),
        right:
          getOffsetLeft(this.projectFigures[index], this.pageContainer) -
          this.self.offsetWidth,
      })
    })
  }

  setScrollState = (scrolling, scrollLeft) => {
    if (this.scrolling !== scrolling) this.scrolling = scrolling
    if (this.scrolling === false) this.animate(scrollLeft)
    if (this.scrolling === true) this.setState({ animate: false })
  }
}
