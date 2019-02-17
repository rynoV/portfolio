import styled from 'styled-components/macro'

export const StyledProjectsListItem = styled.li`
  display: flex;
`

export const ProjectsList = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 20px;
  padding: 0;

  transform-origin: center left;
  transform: ${({ hovered }) => (hovered ? 'scaleX(1)' : 'scaleX(0)')};
  transition: transform 0.2s;

  li {
    margin: 0px 20px;
  }
`