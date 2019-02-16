import styled, { keyframes } from 'styled-components/macro'

const getKeyframes = ({ animate, travel }) => {
  const initialTransform = animate === null ? 0 : animate === true ? 0 : travel

  const finalTransform = animate === null ? 0 : animate === true ? travel : 0

  const initialOpacity = animate === null ? 1 : animate === true ? 1 : 0

  const finalOpacity = animate === null ? 1 : animate === true ? 0 : 1

  return keyframes`
    0% {
      transform: translate3d(0, ${initialTransform}, 0);
      opacity: ${initialOpacity};
    }
    ${
  animate === true
    ? `40% {
      opacity: ${finalOpacity};
    }`
    : `20% {
      opacity: ${initialOpacity};
    }
    80% {
      opacity: ${finalOpacity};
    }`
}
    100% {
      transform: translate3d(0, ${finalTransform}, 0);
      opacity: ${finalOpacity};
    }
  `
}

export const StyledPopupAvatar = styled.img`
  animation: ${getKeyframes} 500ms forwards;
  grid-area: avatar;
  align-self: end;
  justify-self: center;
  filter: drop-shadow(0px 5px 5px #00000033);
  border-bottom: 2px solid #00000033;
`
