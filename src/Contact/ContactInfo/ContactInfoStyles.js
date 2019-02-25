import styled from 'styled-components/macro'

export const StyledContactInfo = styled.div`
  --border: 1px solid var(--primary-light);

  grid-area: info;
  align-self: center;

  min-height: 0;
  overflow: scroll;
  max-height: 100%;

  border-top: var(--border);
  border-bottom: var(--border);

  .header {
    font: var(--subtitle1-font);
    font-weight: bold;
  }
`
