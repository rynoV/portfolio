import styled from 'styled-components/macro'

export const StyledNavList = styled.ul`
  list-style: none;

  margin: 0;
  padding: 0;

  transform-origin: top center;
  transform: ${({ expanded }) => (expanded ? 'scaleY(1)' : 'scaleY(0)')};
  transition: transform 0.2s;

  a {
    color: inherit;
    text-decoration: none;
  }
  li {
    margin: 20px 0px;
  }
`


