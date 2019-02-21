import styled, { css } from 'styled-components/macro'

const leftButtonStyles = css`
  margin-right: auto;
`
const rightButtonStyles = css`
  margin-left: auto;
`

export const Arrow = styled.img`
  opacity: 0.2;
  transition: opacity 300ms, filter 300ms;
  height: 12vh;
  filter: drop-shadow(0px 1px 1px var(--primary-light));

  &:hover {
    opacity: 1;
  }
`

export const ArrowButton = styled.button`
  ${({ arrow }) => {
    if (arrow === 'left') return leftButtonStyles
    else if (arrow === 'right') return rightButtonStyles
  }}
  background: transparent;
  border: none;
  z-index: 500;
  align-self: center;
`
