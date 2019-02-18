import styled, { keyframes, css } from 'styled-components/macro'

export const StyledInitialAvatar = styled.img`
  max-height: 10vh;
`

const loopWait = 3

const jump = keyframes`
  {
  0%, ${20 / loopWait}%, ${50 / loopWait}%, ${80 / loopWait}%, 100%{
	transform: translateY(0);
  }
  ${40 / loopWait}%{
	transform: translateY(-60%);
  }
  ${60 / loopWait}%{
	transform: translateY(-15%);
  }
}
`

const animateOut = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `

export const Button = styled.button`
  position: absolute;
  top: 50vh;
  left: 50vw;
  background: transparent;
  border: none;
  padding: 0;
  ${({ mountState, duration }) =>
    mountState === 'exiting'
      ? css`
          animation: ${animateOut} ${duration}ms forwards;
        `
      : css`
          animation: ${jump} 3s 1s infinite ease-out;
        `};
`
