import styled from 'styled-components/macro'

export const StyledNav = styled.nav`
  position: absolute;
  z-index: 500;
  background: transparent;
  margin: 10px 15px;
  min-width: ${({ active }) => (active ? '10%' : 'initial')};
  min-height: ${({ active }) => (active ? '30%' : 'initial')};
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
