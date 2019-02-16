import styled from 'styled-components/macro'

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  ul {
    width: calc(100% / 3);
    display: flex;
    justify-content: space-around;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
