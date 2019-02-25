import styled, { keyframes } from 'styled-components/macro'

const getKeyframes = ({ animate }) => {
  const initialTransform = animate === null ? 0 : animate === true ? 0 : -80
  const finalTransform = animate === null ? 0 : animate === true ? -80 : 0
  const midTransform = animate ? initialTransform : finalTransform

  const shadow = '0px 6px 8px 7px #00000044'

  const initialShadow =
    animate === null ? 'none' : animate === true ? 'none' : shadow
  const finalShadow =
    animate === null ? 'none' : animate === true ? shadow : 'none'
  const midShadow = animate ? finalShadow : initialShadow

  const initialScale = animate === null ? 1 : animate === true ? 1 : 1.04
  const finalScale = animate === null ? 1 : animate === true ? 1.04 : 1
  const midScale = animate ? finalScale : initialScale

  return keyframes`
          0% {
            transform: translate3d(0, ${initialTransform}vh, 0) scale(${initialScale});
            box-shadow: ${initialShadow};
          }
          50% {
            transform: translate3d(0, ${midTransform}vh, 0) scale(${midScale});
            box-shadow: ${midShadow};
          }
          100% {
            transform: translate3d(0, ${finalTransform}vh, 0) scale(${finalScale});
            box-shadow: ${finalShadow};
          }
        `
}

export const StyledProjectFigure = styled.figure`
  --duration: ${({ quickScroll }) => (quickScroll ? '100ms' : '600ms')};

  transform: scale(1);
  box-shadow: none;
  animation: ${getKeyframes} var(--duration) forwards;
  animation-timing-function: ease-out;

  width: 45%;
  max-width: 65%;
  max-height: 100%;
  img {
    max-width: 100%;
  }

  background: var(--surface);
  color: var(--on-surface);
  border-bottom: 1px solid var(--primary);
`
