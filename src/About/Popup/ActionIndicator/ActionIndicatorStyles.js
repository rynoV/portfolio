import styled, { keyframes } from 'styled-components/macro'

const slideRight = keyframes`
  0% {
    left: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: var(--left);
    opacity: 0;
  }
`

export const StyledActionIndicator = styled.div`
  grid-area: actionBox;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  margin: 1em 0;
  display: flex;
  align-items: center;
`

export const ArrowWrapper = styled.div`
  border-left: 2px solid #00000033;
  border-right: 2px solid #00000033;
  border-radius: 50px;
  width: 80%;
`

export const Arrow = styled.img`
  --width: 7%;
  --left: calc(100% - var(--width));

  max-height: 80%;
  width: var(--width);
  position: relative;
  animation: ${slideRight} 4.5s linear infinite;
`
