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

  margin: 1rem 0;
  padding: 0.2rem;
  max-width: 25vw;

  animation: ${fade} var(--duration) forwards;

  font: var(--body1-font);
  background: var(--surface);
  color: var(--on-surface);
  border: 1px solid var(--primary);
`
