import styled, { keyframes } from 'styled-components/macro'

/**
 * Keeps the component at travel until animation starts, then allows the component to move to it's natural position in the DOM, then moves it back when animation ends.
 * @param {Object} props:
 * @param {Bool} animate: either null, true, or false. This is state passed as a prop which should be null to start, then set to true when animation is meant to start, then false when it is meant to end.
 * @param {String} travel: State passed as a prop that represents the travel distance. Should be computed and set in componentDidMount
 */
const getKeyframes = ({ animate, travel }) => {
  const initialTransform = animate === null ? 0 : animate === true ? travel : 0

  const finalTransform =
    animate === null ? travel : animate === true ? 0 : travel

  const initialOpacity = animate === null ? 0 : animate === true ? 0 : 1
  const finalOpacity = animate === null ? 0 : animate === true ? 1 : 0

  return keyframes`
    0% {
      transform: translate3d(0, ${initialTransform}vh, 0);
      opacity: ${initialOpacity};
    }
    ${
  animate === true
    ? `30% {
      opacity: ${initialOpacity};
    }
    90% {
      opacity: ${finalOpacity};
    }`
    : `50% {
      opacity: ${finalOpacity};
    }`
}
    100% {
      transform: translate3d(0, ${finalTransform}vh, 0);
      opacity: ${finalOpacity};
    }
  `
}

export const StyledContactAvatar = styled.img`
  /**
   * Start it off the page, then when the animation kicks in let it take over the translation.
   */
  transform: ${({ travel }) => `translate3d(0, ${travel}, 0)`};
  animation: ${getKeyframes} 500ms forwards;

  height: var(--avatar-height);
  margin-right: 2vw;

  grid-area: avatar;
  justify-self: center;

  border-bottom: 1px solid var(--primary-light);
`
