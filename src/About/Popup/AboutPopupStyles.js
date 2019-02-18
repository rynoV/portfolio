import styled, { keyframes } from 'styled-components/macro'

const fade = ({ mountState }) => {
  const initialOpacity =
    mountState === 'entering' ? 0 : mountState === 'exiting' ? 1 : 0
  const finalOpacity =
    mountState === 'entering' ? 1 : mountState === 'exiting' ? 0 : 1

  return keyframes`
    from {
      opacity: ${initialOpacity};
    }
    to {
      opacity: ${finalOpacity};
    }
  `
}

export const StyledPopup = styled.section`
  --duration: ${({ duration }) => `${duration}ms`};

  display: grid;
  grid-template:
    'avatar info' 1fr
    / 3fr 7fr;
  column-gap: 1em;
  opacity: 0;
  animation: ${fade} var(--duration) forwards;
  width: 50%;
  max-height: 40%;
  padding: 2em 1em;
  background: #bbb;
  box-shadow: 10px 10px 10px 2px #00000044;
  border: 3px solid #000000bb;
  border-radius: 20px;
`

export const Info = styled.div`
  grid-area: info;
  min-height: 0;
  overflow: scroll;
  max-height: 100%;

  && > * {
    overflow: auto;
  }

  && > p {
    margin: 0;
    max-height: 100%;
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
