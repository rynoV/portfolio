import React, { PureComponent } from 'react'

import { StyledProjectsAvatar } from './ProjectsAvatarStyles'

import { Refs, refKeys } from '../../Context/context'

import avatar_standing from '../../images/avatar_standing.png'

import updateAnimateState from '../../Utils/updateAnimateState'
import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'

export default class ProjectsAvatar extends PureComponent {
  constructor(props) {
    super(props)

    this.travelAmt = 3000

    this.state = {
      animate: null,
      travel: `${this.travelAmt}px`,
    }
  }

  static contextType = Refs

  render() {
    return (
      <StyledProjectsAvatar
        animate={this.state.animate}
        travel={this.state.travel}
        src={avatar_standing}
        alt="Pixel Avatar of Calum Sieppert"
        ref={el => {
          this.context.setRef(refKeys.projectsAvatar, el)
          this.self = el
        }}
      />
    )
  }

  async componentDidMount() {
    this.top = this.self.getBoundingClientRect().top

    await initializeRefs.bind(
      this,
      refKeys.projectsContainer,
      refKeys.projectFigureComps,
      refKeys.pageContainer
    )()

    this.initializeFromRefs()

    this.setTravel(this.top)

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTravel)
  }

  /**
   * Waits for resize to finish, then calls onResizeFinish
   */
  handleResize = () => {
    clearTimeout(this.resizeTimeoutID)
    this.resizeTimeoutID = setTimeout(this.onResizeFinish, 500)
  }

  onResizeFinish = () => {
    const { self } = this

    this.top =
      this.state.animate !== true
        ? self.getBoundingClientRect().top - this.travelAmt
        : self.getBoundingClientRect().top

    this.initializeFromRefs()

    this.setTravel(this.top)
  }

  /**
   * Called on scroll from PageContainer
   * @param {Number} scrollLeft
   */
  animate(scrollLeft) {
    const { animateLeftBound, animateRightBound } = this

    if (
      !(Number.isFinite(animateLeftBound) && Number.isFinite(animateRightBound))
    ) {
      console.log('Animate bounds were NaN in ProjectsAvatar')
      return
    }

    const animate =
      scrollLeft >= animateLeftBound && scrollLeft <= animateRightBound

    updateAnimateState.bind(this, 'animate', animate)()
  }

  setTravel = top => {
    this.travelAmt = this.projectsContainer.offsetHeight - top

    this.setState({
      travel: `${this.travelAmt}px`,
    })
  }

  initializeFromRefs = () => {
    const { projectsContainer, projectFigureComps, pageContainer } = this

    this.projectPanelWidth =
      projectsContainer.offsetWidth / projectFigureComps.length

    this.animateLeftBound = getOffsetLeft(projectsContainer, pageContainer)

    this.animateRightBound =
      this.animateLeftBound +
      projectsContainer.offsetWidth -
      this.projectPanelWidth / 2
  }
}
