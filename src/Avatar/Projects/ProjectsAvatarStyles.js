import styled, { keyframes } from 'styled-components/macro'

const getKeyframes = ({ animate, travel }) => {
  const initialTransform = animate === null ? 0 : animate === true ? travel : 0
  const finalTransform =
    animate === null ? travel : animate === true ? 0 : travel

  const initialOpacity = animate === null ? 0 : animate === true ? 0 : 1
  const finalOpacity = animate === null ? 0 : animate === true ? 1 : 0

  return keyframes`
    0% {
      transform: translate3d(0, ${initialTransform}, 0);
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
      transform: translate3d(0, ${finalTransform}, 0);
      opacity: ${finalOpacity};
    }
  `
}

export const StyledProjectsAvatar = styled.img`
  --height: 15vh;

  /**
   * Start it off the page, then when the animation kicks in let it take over the translation.
   */
  transform: ${({ travel }) => `translate3d(0, ${travel}, 0)`};
  height: var(--height);
  animation: ${getKeyframes} 300ms forwards;
  margin-left: 1vw;
`
