import React, { PureComponent } from 'react'
import ProjectsAvatar from '../../Avatar/Projects/ProjectsAvatar'

import { projectsList } from '../ProjectsPanel/projectsList'
import { refKeys, Refs } from '../../Context/context'
import { Wrapper, StyledContainer } from './ContainerStyles'
import SpeechBubble from './SpeechBubble/SpeechBubble'

export default class ProjectsAvContainer extends PureComponent {
  static contextType = Refs
  render() {
    const { setRef } = this.context
    return (
      <StyledContainer numOfProjects={projectsList.length}>
        <Wrapper>
          <SpeechBubble ref={el => setRef(refKeys.speechBubbleComp, el)} />
          <ProjectsAvatar ref={el => setRef(refKeys.projectsAvComp, el)} />
        </Wrapper>
      </StyledContainer>
    )
  }
}
