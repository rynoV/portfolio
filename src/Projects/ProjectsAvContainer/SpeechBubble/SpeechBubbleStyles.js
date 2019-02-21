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
  --background: white;
  --animDuration: ${({ animate }) => (animate ? '200ms' : '100ms')};
  --triangle-space: 30px;

  position: relative;
  background: #bbb;
  width: 35vw;
  height: 30vh;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  bottom: var(--triangle-space);
  display: inline-block;
  margin-left: 10px;
  background: var(--background);

  &&:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: var(--triangle-space) solid transparent;
    border-top-color: var(--background);
    border-bottom: 0;
    border-left: 0;
    margin-bottom: calc(-1 * var(--triangle-space));
  }

  opacity: 0;
  animation: var(--animDuration) forwards ${getKeyframes};

  && p {
    max-height: 100%;
    margin: 0;
    overflow: scroll;
  }
`
