import styled from 'styled-components/macro'
import calgary from '../../images/temple.jpg'

export const StyledContactPanel = styled.section`
  height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background: var(--background);
`

export const ContactPanelContent = styled.section`
  --avatar-height: 25vh;

  display: grid;
  grid-template:
    'avatar info' 1fr
    / 3fr 7fr;
  column-gap: 1em;
  width: 50%;
  max-height: var(--avatar-height);
  padding: 2em 1em;

  font: var(--body1-font);
  background: var(--surface);
  color: var(--on-surface);
  border: 1px solid var(--primary);
`
