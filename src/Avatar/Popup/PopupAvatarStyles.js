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

export const Frame = styled.div`
  grid-area: avatar;
  justify-self: center;
  align-self: center;
  min-height: 0;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 5px 5px 0px;

  background: var(--surface);
  border: 1px solid var(--primary-light);
`

export const StyledPopupAvatar = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: var(--avatar-height);
  animation: ${getKeyframes} 500ms forwards;
  /* filter: drop-shadow(0px 5px 5px #00000033); */
`
