import styled from 'styled-components/macro'

/**
 * Sits above the projects container and allows the projects avatar to use sticky and absolute behavior
 */
export const StyledContainer = styled.div`
  position: absolute;
  width: calc(100vw * ${({ numOfProjects }) => numOfProjects});
  height: 100vh;
  background: transparent;
  display: flex;
`

export const Wrapper = styled.div`
  align-self: center;
  display: inline-block;
  max-width: 40vw;
  position: sticky;
  left: 0;
`
