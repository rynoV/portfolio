import React, { PureComponent } from 'react'
import { StyledSpeechBubble } from './SpeechBubbleStyles'

import { refKeys, Refs } from '../../../Context/context'

import initializeRefs from '../../../Utils/initializeRefs'
import updateAnimateState from '../../../Utils/updateAnimateState'
import getOffsetLeft from '../../../Utils/getOffsetLeft'
import { projectsList } from '../../ProjectsPanel/projectsList'

export default class SpeechBubble extends PureComponent {
  constructor(props) {
    super(props)

    this.projectIndex = 0

    this.state = {
      animate: null,
    }
  }

  static contextType = Refs

  render() {
    const text = projectsList[this.projectIndex].description

    return (
      <StyledSpeechBubble
        animate={this.state.animate}
        ref={el => {
          this.context.setRef(refKeys.speechBubbleContainer, el)
          this.self = el
        }}
      >
        <p>{text}</p>
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
  animate = () => {
    const animate =
      this.inProjectBound1 || this.inProjectBound2 || this.inProjectBound3

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

  /**
   * Called from pageContainer on scroll start and stop.
   * Stops animation while scrolling and starts it on scroll stop.
   * @param {Bool} scrolling
   * @param {Number} scrollLeft
   */
  setScrollState = (scrolling, scrollLeft) => {
    if (scrolling === false) {
      this.setInProjectBools(scrollLeft)

      this.updateProjectIndex()

      this.animate()
    }
    if (scrolling === true) this.setState({ animate: false })
  }

  /**
   * this.projectIndex used to display the matching description for each project
   */
  updateProjectIndex() {
    if (this.inProjectBound1) this.projectIndex = 0
    else if (this.inProjectBound2) this.projectIndex = 1
    else if (this.inProjectBound3) this.projectIndex = 2
  }

  /**
   * @param {Number} scrollLeft
   */
  setInProjectBools(scrollLeft) {
    const { animateBounds } = this

    this.inProjectBound1 =
      scrollLeft >= animateBounds[0].left &&
      scrollLeft <= animateBounds[0].right

    this.inProjectBound2 =
      scrollLeft >= animateBounds[1].left &&
      scrollLeft <= animateBounds[1].right

    this.inProjectBound3 =
      scrollLeft >= animateBounds[2].left &&
      scrollLeft <= animateBounds[2].right
  }
}
