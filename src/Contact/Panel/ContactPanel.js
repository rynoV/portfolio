import React, { memo } from 'react'

import { StyledContactPanel, ContactPanelContent } from './ContactPanelStyles'
import { Refs, refKeys } from '../../Context/context'

import ContactAvatar from '../../Avatar/Contact/ContactAvatar'
import ContactInfo from '../ContactInfo/ContactInfo'

export default memo(function ContactPanel() {
  return (
    <Refs.Consumer>
      {context => (
        <StyledContactPanel
          ref={el => context.setRef(refKeys.contactContainer, el)}
          id="contact"
          tabIndex="0"
        >
          <ContactPanelContent>
            <ContactAvatar
              ref={el => context.setRef(refKeys.contactAvComp, el)}
            />
            <ContactInfo />
          </ContactPanelContent>
        </StyledContactPanel>
      )}
    </Refs.Consumer>
  )
})
