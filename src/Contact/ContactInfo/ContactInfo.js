import React, { PureComponent } from 'react'

import ContactLinks from './Links/ContactLinks'
import { StyledContactInfo } from './ContactInfoStyles.js'

export default class ContactInfo extends PureComponent {
  render() {
    return (
      <StyledContactInfo>
        <p class="header">Get in touch:</p>
        <p>
          Email me at{' '}
          <a href="mailto:sieppertcalum@gmail.com">sieppertcalum@gmail.com</a>{' '}
          or find me on these social sites:
        </p>
        <ContactLinks />
      </StyledContactInfo>
    )
  }
}
