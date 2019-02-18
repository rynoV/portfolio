import styled, { keyframes } from 'styled-components/macro'

const fade = ({ state }) => {
  const enter = state === 'entered' || state === 'entering'
  const exit = state === 'exited' || state === 'exiting'

  const initialOpacity = enter ? 0 : exit ? 1 : 0
  const finalOpacity = enter ? 1 : exit ? 0 : 1

  return keyframes`
    from {
      opacity: ${initialOpacity};
    }
    to {
      opacity: ${finalOpacity};
    }
  `
}

export const StyledHelpPopup = styled.div`
  --duration: ${({ duration }) => `${duration}ms`};

  margin: 2rem 0;
  padding: 0.2em;
  background: #bbb;
  box-shadow: 5px 5px 5px 2px #00000055;
  border-radius: 10px;

  animation: ${fade} var(--duration) forwards;
`
