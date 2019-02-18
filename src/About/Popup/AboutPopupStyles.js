import styled, { keyframes } from 'styled-components/macro'

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`

const slideRight = keyframes`
  0% {
    left: 0;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    left: var(--left);
    opacity: 0;
  }
`

export const ArrowWrapper = styled.div`
  grid-area: arrowBox;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  margin: 1em 0;
  display: flex;
  align-items: center;
  border-left: 2px solid #00000033;
  border-right: 2px solid #00000033;
  border-radius: 50px;
`

export const Arrow = styled.img`
  --width: 7%;
  --left: calc(100% - var(--width));

  max-height: 80%;
  width: var(--width);
  position: relative;
  animation: ${slideRight} 4.5s linear infinite;
`

export const StyledPopup = styled.section`
  opacity: 0;
  animation: ${fadeIn} 250ms forwards;
  width: 50%;
  max-height: 40%;
  padding: 15px 40px 0px 15px;
  border: 3px solid #000000bb;
  background: #bbb;
  border-radius: 20px;

  display: grid;
  grid-template:
    'avatar content' 8fr
    'empty arrowBox' 2fr
    / 3fr 7fr;
  column-gap: 2rem;
  row-gap: 1rem;

  background: #bbb;
  box-shadow: 10px 10px 10px 2px #00000044;
  border: 3px solid #000000bb;
  border-radius: 20px;
`

export const Info = styled.div`
  grid-area: content;
  overflow: scroll;
  align-self: end;
  max-height: 100%;

  && > * {
    overflow: auto;
  }

  && p {
    margin: 0;
  }
`

export const PopupContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000022;
`
