import styled, { keyframes } from 'styled-components/macro'

const expand = ({ state }) => {
  const enter = state === 'entering' || state === 'entered'
  const exit = state === 'exiting' || state === 'exited'

  const initialScale = enter ? 'scaleY(0)' : exit ? 'scaleY(1)' : 'scaleY(0)'
  const finalScale = enter ? 'scaleY(1)' : exit ? 'scaleY(0)' : 'scaleY(1)'

  return keyframes`
    from {
      transform: ${initialScale};
    }
    to {
      transform: ${finalScale};
    }
  `
}

export const StyledNavList = styled.ul`
  --duration: ${({ duration }) => `${duration}ms`};

  list-style: none;
  margin: 0;
  padding: 0;

  transform-origin: top center;
  animation: ${expand} var(--duration) forwards;

  a {
    color: inherit;
    text-decoration: none;
  }
  li {
    margin: 30px 0px;
  }
`
