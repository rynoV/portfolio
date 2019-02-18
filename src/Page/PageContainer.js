import React, { Component } from 'react'

import Page from './Page'

import _throttle from 'lodash.throttle'
import normalizeWheel from 'normalize-wheel'
import { Refs, Progress, stages, nullRefs, refKeys } from '../Context/context'

import getRefsProm from '../Context/getRefsProm'
import setRef from '../Context/setRef'
import updateStage from '../Context/updateStage'
import setRefArray from '../Context/setRefArray'

import getOffsetLeft from '../Utils/getOffsetLeft'
import { setPanelIndex } from '../Context/setPanelIndex'

export default class PageContainer extends Component {
  constructor() {
    super()

    this.updateStage = updateStage.bind(this)

    this.setPanelIndex = setPanelIndex.bind(this)

    this.setRef = setRef.bind(this)

    this.setRefArray = setRefArray.bind(this)

    this.getRefsProm = getRefsProm

    this.state = {
      progressContext: {
        panelIndex: 0,
        stage: stages.initial,
        updateStage: this.updateStage,
      },
      refsContext: {
        refs: nullRefs,
        setRef: this.setRef,
        setRefArray: this.setRefArray,
        getRefsProm: this.getRefsProm,
      },
    }
  }

  render() {
    const { state, persistAndCall, handleScroll } = this

    return (
      <Refs.Provider value={state.refsContext}>
        <Progress.Provider value={state.progressContext}>
          <Page handleScroll={e => persistAndCall(e, handleScroll)} />
        </Progress.Provider>
      </Refs.Provider>
    )
  }

  /**
   * Initialize refs
   * Begin listening for wheel
   */
  componentDidMount() {
    this.root = document.querySelector('#root')

    this.state.refsContext.setRef(refKeys.pageContainer, this.root)

    this.initialize()

    this.listenForWheel()

    this.root.addEventListener('scroll', this.handleScroll)

    window.addEventListener('resize', this.handleResize)

    window.addEventListener('keyup', this.handleKeyup)
  }

  componentWillUnmount() {
    this.root.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keyup', this.handleKeyup)

    this.listenForWheel = null
  }

  /**
   * Scrolls to next panel on up arrow keyup and the reverse on down arrow.
   * Stops project and popupAvatar animations on tab keyup.
   */
  handleKeyup = e => {
    const { panelBoundPairs } = this,
          {
            pageContainer,
            projectFigureComps,
            popupAvComp,
          } = this.state.refsContext.refs

    let { panelIndex } = this.state.progressContext

    const activeElOverflow = window.getComputedStyle(document.activeElement)
      .overflowY

    switch (e.keyCode) {
    case 38:
      if (activeElOverflow === 'auto' || activeElOverflow === 'scroll') break
      this.setProjectQuickScroll()
      if (panelIndex < panelBoundPairs.length - 1) {
        panelIndex++
        pageContainer.scrollTo({
          top: 0,
          left: panelBoundPairs[panelIndex].left,
          behavior: 'smooth',
        })
      }
      break
    case 40:
      if (activeElOverflow === 'auto' || activeElOverflow === 'scroll') break
      this.setProjectQuickScroll()
      if (panelIndex > 0) {
        panelIndex--
        pageContainer.scrollTo({
          top: 0,
          left: panelBoundPairs[panelIndex].left,
          behavior: 'smooth',
        })
      }
      break
    case 9:
      if (popupAvComp) popupAvComp.stopAnimate()
      projectFigureComps.forEach(projectFigureComp =>
        projectFigureComp.stopAnimate()
      )
      break
    default:
      break
    }
  }

  /**
   * Waits for resize to finish, then calls onResizeFinish
   */
  handleResize = () => {
    clearTimeout(this.resizeTimeoutID)
    this.resizeTimeoutID = setTimeout(this.initialize, 500)
  }

  /**
   * Called when the component mounts
   * Manually adds wheel event listener to container
   * On vertical scroll attempt, calls handler and removes listener. Readds it after a specified wait time.
   */
  listenForWheel = () => {
    const { pageContainer } = this.state.refsContext.refs
    const reAddListenerWait = 1200

    const handleWheel = e => {
      const targetOverflow = window.getComputedStyle(e.target).overflowY

      if (targetOverflow === 'auto' || targetOverflow === 'scroll') return

      const { pixelX, pixelY } = normalizeWheel(e)
      /**
       * * normalized.pixelX (the horizontal wheel value) will equal -0 when the user is scrolling vertically. Cannot compare to -0 with === so use Object.is
       */
      if (Object.is(pixelX, -0)) {
        this.scrollOnWheel(pixelY)
        /**
         * This allows us to only respond to the first wheel event every reAddListenerWait seconds
         */
        pageContainer.removeEventListener('wheel', handleWheel)
        setTimeout(() => {
          pageContainer.addEventListener('wheel', handleWheel)
        }, reAddListenerWait)
      }
    }
    pageContainer.addEventListener('wheel', handleWheel)
  }

  /**
   * Called on vertical scroll attempt
   * Scrolls to next panel based on wheel direction
   * @param {Number} pixelY: Vertical wheel amount
   */
  scrollOnWheel = pixelY => {
    const { panelBoundPairs } = this
    const { pageContainer } = this.state.refsContext.refs

    const { scrollLeft } = pageContainer

    let { panelIndex } = this.state.progressContext

    this.setProjectQuickScroll()

    if (panelIndex == null) return

    const userIsInPanel =
      scrollLeft > panelBoundPairs[panelIndex].left + 10 &&
      scrollLeft < panelBoundPairs[panelIndex].right - 10

    /**
     * Only scroll to start of the panel the user is in.
     */
    if (userIsInPanel && pixelY < 0) {
      pageContainer.scrollTo({
        top: 0,
        left: panelBoundPairs[panelIndex].left,
        behavior: 'smooth',
      })

      return
    }

    /**
     * * Change the targeted panel depending on scroll direction and make sure only panels that exist can be targeted
     */
    if (pixelY > 0 && panelIndex < panelBoundPairs.length - 1) {
      panelIndex++
    } else if (pixelY < 0 && panelIndex > 0) {
      panelIndex--
    } else return

    pageContainer.scrollTo({
      top: 0,
      left: panelBoundPairs[panelIndex].left,
      behavior: 'smooth',
    })
  }

  /**
   * Called on scroll
   * Updates state to correct index based on scroll position
   * @param {Number} scrollLeft
   */
  updatePanelIndex = scrollLeft => {
    this.panelBoundPairs.forEach((panelBoundPair, index) => {
      const userMovedToPanel =
        scrollLeft >= panelBoundPair.left &&
        scrollLeft < panelBoundPair.right &&
        this.state.progressContext.panelIndex !== index

      if (userMovedToPanel) {
        this.setPanelIndex(index)
      }
    })
  }

  /**
   * Utility for calling throttled/debounced functions
   * @param {Event Object} e
   * @param {Function} func
   */
  persistAndCall = (e, func) => {
    e.persist()
    func(e)
  }

  /**
   * Called on container scroll
   * Updates stage from initial to popup
   * Calls the project component's scroll handler
   * Starts panelIndex update
   * Animates avatars
   * @param {Event Object} e
   */
  handleScroll = _throttle(e => {
    const { scrollLeft } = e.target,
          { state, updatePanelIndex } = this,
          {
            contactAvComp,
            speechBubbleComp,
            projectsAvComp,
          } = this.state.refsContext.refs

    projectsAvComp.animate(scrollLeft)

    speechBubbleComp.setScrollState(true)

    clearTimeout(this.waitForScrollEnd)
    this.waitForScrollEnd = setTimeout(
      () => this.handleScrollEnd(scrollLeft),
      400
    )

    if (state.progressContext.stage === 'initial')
      state.progressContext.updateStage(stages.aboutPopup)

    updatePanelIndex(scrollLeft)

    this.inAbout(scrollLeft)

    this.inProjects(scrollLeft)

    if (state.progressContext.panelIndex > 2) contactAvComp.animate(scrollLeft)
  }, 50)

  handleScrollEnd = scrollLeft => {
    this.scrollSnap(scrollLeft)

    const { speechBubbleComp } = this.state.refsContext.refs
    speechBubbleComp.setScrollState(false, scrollLeft)
  }

  scrollSnap = scrollLeft => {
    if (this.snap === false) return

    const { pageContainer } = this.state.refsContext.refs
    const { panelIndex } = this.state.progressContext

    if (panelIndex == null) return

    const { left, right } = this.panelBoundPairs[panelIndex]
    const panelMidWay = left + (right - left) / 2

    if (scrollLeft <= panelMidWay)
      pageContainer.scrollTo({
        top: 0,
        left: left,
        behavior: 'smooth',
      })
    else if (scrollLeft > panelMidWay)
      pageContainer.scrollTo({
        top: 0,
        left: right,
        behavior: 'smooth',
      })

    this.snap = false
    setTimeout(() => {
      this.snap = true
    }, 500)
  }

  setProjectQuickScroll() {
    const { panelIndex } = this.state.progressContext
    const { projectFigureComps } = this.state.refsContext.refs

    if (projectFigureComps[panelIndex - 1] != null)
      projectFigureComps[panelIndex - 1].setQuickScroll()
  }

  /**
   * Handles actions for when user is in the about panel
   * @param {Number} scrollLeft
   * @param {Component instance} popupAvComp
   */
  inAbout(scrollLeft) {
    const { popupAvComp } = this.state.refsContext.refs
    const { aboutLeftBound, aboutRightBound } = this

    const userIsInAbout =
      scrollLeft > aboutLeftBound && scrollLeft < aboutRightBound

    if (userIsInAbout && popupAvComp) popupAvComp.animate(scrollLeft)
  }

  /**
   * Handles actions for when user is in the projects panel
   * @param {Number} scrollLeft
   * @param {Array: Component instances} projectComps
   */
  inProjects(scrollLeft) {
    const { refsContext, progressContext } = this.state
    const { projectsLeftBound, projectsRightBound } = this
    const { projectFigureComps } = refsContext.refs

    const currentProjectFigure =
      projectFigureComps[progressContext.panelIndex - 1]

    const userIsInProjects =
      scrollLeft > projectsLeftBound && scrollLeft < projectsRightBound

    if (userIsInProjects) {
      if (progressContext.stage !== stages.projects)
        progressContext.updateStage(stages.projects)

      if (
        progressContext.panelIndex >= 1 &&
        progressContext.panelIndex < this.panelBoundPairs.length - 1
      ) {
        currentProjectFigure.animate(scrollLeft)
      }
    }
  }

  /**
   * Called in component did mount to initialize calculated class wide variables
   */
  initialize = () => {
    const { refs } = this.state.refsContext

    /* ---Panels--- */
    const panelContainers = [
      refs.aboutContainer,
      ...refs.projectContainers,
      refs.contactContainer,
    ]

    this.panelBoundPairs = panelContainers.map(panelContainer => ({
      left: getOffsetLeft(panelContainer, refs.pageContainer),
      right:
        getOffsetLeft(panelContainer, refs.pageContainer) +
        panelContainer.offsetWidth,
    }))

    /* ---About--- */

    const { offsetWidth: aboutWidth } = refs.aboutContainer,
          aboutLeftBound = getOffsetLeft(refs.aboutContainer, refs.pageContainer)

    this.aboutLeftBound = aboutLeftBound
    this.aboutRightBound = aboutLeftBound + aboutWidth

    /* ---Projects--- */

    const { offsetWidth: projectsWidth } = refs.projectsContainer,
          projectsLeftBound = getOffsetLeft(
            refs.projectsContainer,
            refs.pageContainer
          )

    this.projectsLeftBound = projectsLeftBound
    this.projectsRightBound = projectsLeftBound + projectsWidth

    /* ---Contact--- */
    const { offsetWidth: contactWidth } = refs.contactContainer,
          contactLeftBound = getOffsetLeft(
            refs.contactContainer,
            refs.pageContainer
          )

    this.contactLeftBound = contactLeftBound
    this.contactRightBound = contactLeftBound + contactWidth
  }
}
