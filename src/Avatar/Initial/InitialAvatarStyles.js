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

const fade = ({ mountState }) => {
  const initialOpacity =
    mountState === 'entering' ? 0 : mountState === 'exiting' ? 1 : 1
  const finalOpacity =
    mountState === 'entering' ? 1 : mountState === 'exiting' ? 0 : 0

  return keyframes`
    from {
      opacity: ${initialOpacity};
    }
    to {
      opacity: ${finalOpacity};
    }
  `
}

export const Button = styled.button`
  position: absolute;
  top: 50vh;
  left: 50vw;
  background: transparent;
  border: none;
  padding: 0;
  ${({ mountState, duration }) =>
    mountState === 'exiting' || mountState === 'entering'
      ? css`
          animation: ${fade} ${duration}ms forwards;
        `
      : css`
          animation: ${jump} 3s 1s infinite ease-out;
        `};
`

export const SpeechBubble = styled.div`
  --triangle-space: 20px;

  position: relative;
  background: #bbb;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  bottom: var(--triangle-space);
  left: 10%;

  &&:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 40%;
    width: 0;
    height: 0;
    border: var(--triangle-space) solid transparent;
    border-top-color: #bbb;
    border-bottom: 0;
    border-left: 0;
    margin-bottom: calc(-1 * var(--triangle-space));
  }
`
