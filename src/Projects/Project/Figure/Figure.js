import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { StyledProjectFigure } from './FigureStyles'

import { Refs, refKeys } from '../../../Context/context'

import updateAnimateState from '../../../Utils/updateAnimateState'
import getOffsetLeft from '../../../Utils/getOffsetLeft'
import initializeRefs from '../../../Utils/initializeRefs'

export default class ProjectFigure extends PureComponent {
  state = {
    animate: null,
    quickScroll: false,
  }

  static contextType = Refs

  static propTypes = {
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { name, imgSrc, imgAlt, description } = this.props
    return (
      <StyledProjectFigure
        animate={this.state.animate}
        quickScroll={this.state.quickScroll}
        ref={el => {
          this.figure = el
        }}
      >
        <img src={imgSrc} alt={imgAlt} />
        <h1>{name}</h1>
        <figcaption className="caption">{description}</figcaption>
      </StyledProjectFigure>
    )
  }

  async componentDidMount() {
    this.context.setRefArray(refKeys.projectFigureComps, this)
    this.context.setRefArray(refKeys.projectFigures, this.figure)

    await initializeRefs.bind(
      this,
      refKeys.pageContainer,
      refKeys.projectContainers,
      refKeys.speechBubbleComp,
      refKeys.speechBubbleContainer
    )()

    this.initializeFromRefs()

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   * Waits for resize to finish, then calls onResizeFinish
   */
  handleResize = () => {
    clearTimeout(this.resizeTimeoutID)
    this.resizeTimeoutID = setTimeout(this.onResizeFinish, 500)
  }

  onResizeFinish = () => {
    this.initializeFromRefs()
  }

  animate = scrollLeft => {
    const { animateLeftBound, animateRightBound } = this

    if (
      !(Number.isFinite(animateLeftBound) && Number.isFinite(animateRightBound))
    ) {
      console.log('Animate bounds were NaN in Project')
      return
    }
    const animate =
      scrollLeft > animateLeftBound && scrollLeft < animateRightBound

    updateAnimateState.bind(this, 'animate', animate)()
  }

  stopAnimate = () => {
    if (this.state.animate !== false) this.setState({ animate: false })
  }

  setQuickScroll = () => {
    this.setState({ quickScroll: true })
    setTimeout(() => {
      this.setState({ quickScroll: false })
    }, 1000)
  }

  initializeFromRefs = () => {
    const { speechBubbleContainer, projectContainers, pageContainer } = this
    this.container = projectContainers[this.props.index]
    this.containerWidth = this.container.offsetWidth

    const containerOffset = getOffsetLeft(this.container, pageContainer)

    this.animateLeftBound =
      getOffsetLeft(this.figure, this.pageContainer) -
      speechBubbleContainer.offsetWidth
    this.animateRightBound = this.animateLeftBound + this.containerWidth
  }
}
