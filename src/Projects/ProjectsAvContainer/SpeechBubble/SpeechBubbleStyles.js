import styled, { keyframes } from 'styled-components/macro'

const getKeyframes = ({ animate }) => {
  const initialOpacity = animate === null ? 0 : animate === true ? 0 : 1
  const finalOpacity = animate === null ? 0 : animate === true ? 1 : 0

  const initialScale = animate === null ? 0 : animate === true ? 0 : 1
  const finalScale = animate === null ? 0 : animate === true ? 1 : 0

  const middleOpacity = animate ? finalOpacity : initialOpacity
  const middleScale = animate ? initialScale : finalScale

  return keyframes`
    0% {
      opacity: ${initialOpacity};
      transform: scaleX(${initialScale})
    }
    ${animate ? 1 : 99}% {
      opacity: ${middleOpacity};
      transform: scaleX(${middleScale});
    }
    100% {
      opacity: ${finalOpacity};
      transform: scaleX(${finalScale})
    }
  `
}

export const StyledSpeechBubble = styled.div`
  --animDuration: ${({ animate }) => (animate ? '200ms' : '100ms')};

  display: inline-block;
  width: 35vw;
  height: 30vh;
  padding: 1vw;
  margin-left: 10px;
  background: #bbb;
  border-radius: 10px;
  opacity: 0;
  animation: var(--animDuration) forwards ${getKeyframes};

  && p {
    max-height: 100%;
    margin: 0;
    overflow: scroll;
  }
`
