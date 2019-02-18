import styled, { css } from 'styled-components/macro'

const leftButtonStyles = css`
  margin-right: auto;
`
const rightButtonStyles = css`
  margin-left: auto;
`

export const Arrow = styled.img`
  opacity: ${({ hovered }) => (hovered ? '1' : '0.1')};
  transition: opacity 300ms;
  height: 12vh;
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
