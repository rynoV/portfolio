import styled from 'styled-components/macro'

export const StyledNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
  background: transparent;
  margin: 10px 15px;
  width: ${({ active }) => (active ? '30%' : 'initial')};
  height: ${({ active }) => (active ? '30%' : 'initial')};
`

export const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
`

export const Icon = styled.img`
  background: transparent;
  width: 50px;
  transform: ${({ expanded }) => (expanded ? 'rotate(90deg)' : '')};
  transition: transform 0.2s;
`
