import React, { memo } from 'react'

import ProjectPanel from '../Project/Panel'
import ProjectsAvContainer from '../ProjectsAvContainer/Container'

import { StyledProjects } from './ProjectsPanelStyles'

import { projectsList } from './projectsList'

import { Refs, refKeys } from '../../Context/context'

export default memo(function Projects() {
  return (
    <Refs.Consumer>
      {context => (
        <StyledProjects
          id="projects"
          ref={el => context.setRef(refKeys.projectsContainer, el)}
        >
          <ProjectsAvContainer />
          {projectsList.map(
            ({ name, img: { src, alt }, description }, index) => (
              <ProjectPanel
                key={name}
                index={index}
                name={name}
                imgSrc={src}
                imgAlt={alt}
                description={description}
              />
            )
          )}
        </StyledProjects>
      )}
    </Refs.Consumer>
  )
})
