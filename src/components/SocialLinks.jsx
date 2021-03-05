import React from 'react'

import InstaLogo from '../assets/svg/instagram.inline.svg'
import GitHubLogo from '../assets/svg/github.inline.svg'
import LinkedInLogo from '../assets/svg/linkedin.inline.svg'
// import TwitterLogo from '../assets/svg/twitter.inline.svg'
import Email from '../assets/svg/email.inline.svg'
import Resume from '../assets/svg/resume.inline.svg'
import { ExternalLink } from '../components/Links'

const iconStyle = 'transition-colors duration-300 ease-in-out h-6 w-6'
const linkStyle = 'h-6 w-6 p-2 hvr-float-shadow'

const SocialLinks = () => (
  <>
    <ExternalLink className={linkStyle} to="https://github.com/ALazenka">
      <GitHubLogo className={iconStyle} />
    </ExternalLink>
    <ExternalLink
      className={linkStyle}
      to="https://www.linkedin.com/in/andrewlazenka"
    >
      <LinkedInLogo className={iconStyle} />
    </ExternalLink>
    <ExternalLink className={linkStyle} to="https://www.instagram.com/alazenka">
      <InstaLogo className={iconStyle} />
    </ExternalLink>
    {/*
    <span>
      <ExternalLink className={linkStyle} to="">
        <TwitterLogo className={iconStyle} />
      </ExternalLink>
    </span>
    */}
    <ExternalLink className={linkStyle} to="mailto:andrewlazenka@gmail.com">
      <Email className={iconStyle} />
    </ExternalLink>
    <ExternalLink className={linkStyle} to="/andrew-lazenka-resume.pdf">
      <Resume className={iconStyle} />
    </ExternalLink>
  </>
)

export default SocialLinks
