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
  && > li {
    background: #ffffff66;
    border-radius: 0.3em;
    padding: 0.3em;
    box-shadow: 0px 5px 5px 0.5px #00000066;
    margin: 20px 0px;
    width: min-content;
    height: min-content;
  }
`
