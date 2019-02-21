import styled from 'styled-components/macro'
import calgary from '../../images/temple.jpg'
export const StyledAbout = styled.section`
  height: 100vh;
  min-width: 100vw;
  background: center/cover no-repeat var(--background);
  /**
   * Relative position important so this can act as container for absolutely positioned popup
   */
  position: relative;
`
