import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { StyledContactAvatar } from './ContactAvatarStyles'

import { refKeys, Refs } from '../../Context/context'

import avatar_standing from '../../images/avatar_upper_half.png'

import initializeRefs from '../../Utils/initializeRefs'
import getOffsetLeft from '../../Utils/getOffsetLeft'
import updateAnimateState from '../../Utils/updateAnimateState'

export default class ContactAvatar extends PureComponent {
  constructor(props) {
    super(props)

    this.travelAmt = 3000

    this.state = {
      animate: null,
      travel: `${this.travelAmt}px`,
    }
  }

  static propTypes = {}

  static contextType = Refs

  render() {
    return (
      <StyledContactAvatar
        animate={this.state.animate}
        travel={this.state.travel}
        src={avatar_standing}
        alt="Pixel Avatar of Calum Sieppert"
        ref={el => (this.self = el)}
      />
    )
  }

  async componentDidMount() {
    this.top = this.self.getBoundingClientRect().top

    await initializeRefs.bind(
      this,
      refKeys.contactContainer,
      refKeys.pageContainer
    )()

    this.initializeFromRefs()

    this.setTravel(this.top)

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTravel)
  }

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

  animate(scrollLeft) {
    const { animateLeftBound, animateRightBound } = this

    if (
      !(Number.isFinite(animateLeftBound) && Number.isFinite(animateRightBound))
    ) {
      console.log('Animate bounds were NaN in ContactAvatar')
      return
    }

    const animate =
      scrollLeft >= animateLeftBound && scrollLeft < animateRightBound

    updateAnimateState.bind(this, 'animate', animate)()
  }

  setTravel = top => {
    this.travelAmt = this.contactContainer.offsetHeight - top

    this.setState({
      travel: `${this.travelAmt}px`,
    })
  }

  initializeFromRefs() {
    const { contactContainer, pageContainer } = this

    this.animateLeftBound = getOffsetLeft(contactContainer, pageContainer)
    this.animateRightBound =
      this.animateLeftBound + contactContainer.offsetWidth
  }
}
