import React, { PureComponent } from 'react'
import { StyledContactLinks } from './ContactLinksStyles'

import gitHubLogo from '../../../images/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png'
import instagramLogo from '../../../images/GlyphLogo_May2016_Onlinev2/glyph-logo_May2016.png'
import twitterLogo from '../../../images/Twitter Social Icons/Twitter Social Icons/Twitter_SocialIcon_RoundedSquare/Twitter_Social_Icon_Rounded_Square_Color.png'

export default class ContactLinks extends PureComponent {
  render() {
    return (
      <StyledContactLinks>
        <a href="#test">
          <img src={gitHubLogo} alt="Github logo" />
        </a>
        <a href="#test">
          <img src={instagramLogo} alt="Instagram logo" />
        </a>
        <a href="#test">
          <img src={twitterLogo} alt="Twitter logo" />
        </a>
      </StyledContactLinks>
    )
  }
}
