import React, { PureComponent } from 'react'

import { StyledPopupAvatar } from './PopupAvatarStyles'

import { refKeys, Refs } from '../../Context/context'

import avatar_standing from '../../images/avatar_upper_half.png'

import updateAnimateState from '../../Utils/updateAnimateState'
import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'

export default class PopupAvatar extends PureComponent {
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
      <StyledPopupAvatar
        animate={this.state.animate}
        travel={this.state.travel}
        src={avatar_standing}
        alt="Pixel Avatar of Calum Sieppert"
        ref={el => {
          this.context.setRef(refKeys.popupAvatar, el)
          this.self = el
        }}
      />
    )
  }

  /**
   * Initialize variables and state that rely on the DOM.
   */
  async componentDidMount() {
    /**
     * Initialize immediately available variables before waiting.
     */
    this.top = this.self.getBoundingClientRect().top
    this.width = this.self.getBoundingClientRect().width

    await initializeRefs.bind(
      this,
      refKeys.pageContainer,
      refKeys.aboutContainer
    )()

    this.initialize()

    this.setTravel(this.top)

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

  /**
   * Recalculate variables and state the rely on the DOM
   */
  onResizeFinish = () => {
    const { self } = this

    /**
     * If the component is being animated, remove the translation from calculation
     */
    this.top =
      this.state.animate === true
        ? self.getBoundingClientRect().top - this.travelAmt
        : self.getBoundingClientRect().top

    this.width = self.clientWidth

    this.initialize()

    this.setTravel(this.top)
  }

  /**
   * Updates the state based on scroll position to trigger animation.
   * @param {Number} scrollLeft
   */
  animate(scrollLeft) {
    const { animateRightBound, animateLeftBound } = this

    if (Number.isNaN(animateLeftBound) && Number.isNaN(animateRightBound)) {
      console.log('Animate bounds were NaN in PopupAvatar')
      return
    }

    const animate =
      scrollLeft >= animateRightBound || scrollLeft <= animateLeftBound

    updateAnimateState.bind(this, 'animate', animate)()
  }

  stopAnimate = () => {
    this.setState({ animate: false })
  }

  /**
   * Sets the travelAmt and the travel state based on the 'top' param.
   * @param {Number} top the calculated offset of this component, disregarding animation.
   */
  setTravel = top => {
    this.travelAmt = this.aboutContainer.offsetHeight - top

    this.setState({
      travel: `${this.travelAmt}px`,
    })
  }

  initialize() {
    const { self, pageContainer } = this

    this.animateLeftBound = pageContainer.getBoundingClientRect().left

    const preferredRightBound =
      getOffsetLeft(self, pageContainer) - this.width * 2

    this.animateRightBound =
      preferredRightBound > this.animateLeftBound
        ? preferredRightBound
        : getOffsetLeft(self, pageContainer)
  }
}
