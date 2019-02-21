import React, { PureComponent } from 'react'

import { Arrow, ArrowButton } from './ArrowsStyles'

import { Refs, refKeys, stages } from '../../Context/context'

import rightArrowIcon from '../../images/right_arrow.svg'
import leftArrowIcon from '../../images/left_arrow.svg'

import { WithProgressContext } from '../../Utils/WithProgressContext'
import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'

class Arrows extends PureComponent {
  constructor(props) {
    super(props)

    this.numOfPanels = 5
  }

  static contextType = Refs

  render() {
    const { panelIndex, stage } = this.props.progressContext

    const leftArrow = (
      <ArrowButton arrow="left" onClick={this.handleLeftArrow} tabIndex="0">
        <Arrow arrow="left" src={leftArrowIcon} alt="Left arrow" />
      </ArrowButton>
    )

    const rightArrow = (
      <ArrowButton arrow="right" onClick={this.handleRightArrow} tabIndex="0">
        <Arrow arrow="right" src={rightArrowIcon} alt="Right arrow" />
      </ArrowButton>
    )

    return (
      stage !== stages.initial && (
        <>
          {panelIndex > 0 && leftArrow}
          {panelIndex < this.numOfPanels - 1 && rightArrow}
        </>
      )
    )
  }

  async componentDidMount() {
    await initializeRefs.bind(
      this,
      refKeys.aboutContainer,
      refKeys.projectContainers,
      refKeys.contactContainer,
      refKeys.pageContainer,
      refKeys.projectFigureComps
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
    this.resizeTimeoutID = setTimeout(this.initializeFromRefs, 500)
  }

  handleLeftArrow = () => {
    const { panelIndex } = this.props.progressContext

    this.pageContainer.scrollTo({
      top: 0,
      left: this.panelBoundPairs[panelIndex - 1].left,
      behavior: 'smooth',
    })

    this.setProjectQuickScroll()
  }

  handleRightArrow = () => {
    const { panelIndex } = this.props.progressContext

    this.pageContainer.scrollTo({
      top: 0,
      left: this.panelBoundPairs[panelIndex + 1].left,
      behavior: 'smooth',
    })

    this.setProjectQuickScroll()
  }

  setProjectQuickScroll = () => {
    const { panelIndex } = this.props.progressContext
    const { projectFigureComps } = this

    if (projectFigureComps[panelIndex - 1] != null)
      projectFigureComps[panelIndex - 1].setQuickScroll()
  }

  initializeFromRefs = () => {
    const panelContainers = [
      this.aboutContainer,
      ...this.projectContainers,
      this.contactContainer,
    ]

    this.panelBoundPairs = panelContainers.map(panelContainer => ({
      left: getOffsetLeft(panelContainer, this.pageContainer),
      right:
        getOffsetLeft(panelContainer, this.pageContainer) +
        panelContainer.offsetWidth,
    }))

    this.numOfPanels = this.panelBoundPairs.length
  }
}

export default WithProgressContext(Arrows)
