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
  --avatar-height: 25vh;

  display: grid;
  grid-template:
    'avatar info' 1fr
    / 3fr 7fr;
  column-gap: 1em;
  width: 50%;
  max-height: var(--avatar-height);
  padding: 2em 1em;

  opacity: 0;
  animation: ${fade} var(--duration) forwards;

  font: var(--body1-font);
  background: var(--surface);
  border: 1px solid var(--primary);
  color: var(--on-surface);
`

export const Info = styled.div`
  --border: 1px solid var(--primary-light);

  grid-area: info;
  min-height: 0;
  overflow: scroll;
  max-height: 100%;
  max-width: 35em;

  border-top: var(--border);
  border-bottom: var(--border);

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
`
