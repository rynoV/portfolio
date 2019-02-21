import styled, { keyframes } from 'styled-components/macro'

const expand = ({ state }) => {
  const enter = state === 'entering' || state === 'entered'
  const exit = state === 'exiting' || state === 'exited'

  const initialScale = enter ? 'scaleX(0)' : exit ? 'scaleX(1)' : 'scaleX(0)'
  const finalScale = enter ? 'scaleX(1)' : exit ? 'scaleX(0)' : 'scaleX(1)'

  return keyframes`
    from {
      transform: ${initialScale};
    }
    to {
      transform: ${finalScale};
    }
  `
}

export const StyledProjectsList = styled.ul`
  --duration: ${({ duration }) => `${duration}ms`};

  display: flex;

  animation: ${expand} var(--duration) forwards;
  transform-origin: center left;

  li {
    margin: 0 20px;
  }
`
