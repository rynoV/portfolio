import styled, { keyframes, css } from 'styled-components/macro'

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
  background: transparent;
  border: none;
  padding: 0;
`

export const SpeechBubble = styled.div`
  --triangle-space: 20px;

  font: var(--body1-font);
  color: var(--on-surface);
  background: var(--surface);
  border: 1px solid var(--primary);

  display: flex;
  align-items: center;

  position: relative;
  right: 10%;
  bottom: var(--triangle-space);

  padding: 0.5em 1em;
  height: calc(var(--avatar-height) / 2);

  &&:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 40%;

    width: 0;
    height: 0;

    border: var(--triangle-space) solid transparent;
    border-top-color: var(--primary);
    border-bottom: 0;
    border-left: 0;

    margin-bottom: calc(-1 * var(--triangle-space));
  }
`

export const StyledInitialAvatar = styled.img`
  max-height: var(--avatar-height);
`

export const Wrapper = styled.div`
  --avatar-height: 10vh;

  position: absolute;
  top: 50vh;
  left: 50vw;
  ${({ mountState, duration }) =>
    mountState === 'exiting' || mountState === 'entering'
      ? css`
          animation: ${fade} ${duration}ms forwards;
        `
      : css`
          animation: ${jump} 3s 1s infinite ease-out;
        `};
`
