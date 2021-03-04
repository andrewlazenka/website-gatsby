import React from 'react'

import InstaLogo from '../assets/svg/instagram.inline.svg'
import GitHubLogo from '../assets/svg/github.inline.svg'
import LinkedInLogo from '../assets/svg/linkedin.inline.svg'
// import TwitterLogo from '../assets/svg/twitter.inline.svg'
import Email from '../assets/svg/email.inline.svg'
import Resume from '../assets/svg/resume.inline.svg'
import { ExternalLink } from '../components/Links'

const iconStyle = "text-indigo-900 hover:text-indigo-700 transition-colors duration-300 ease-in-out h-6 w-6"

const Footer = () => (
  <>
    <ExternalLink to="https://github.com/ALazenka">
      <GitHubLogo className={iconStyle} />
    </ExternalLink>
    <ExternalLink to="https://www.linkedin.com/in/andrewlazenka">
      <LinkedInLogo className={iconStyle} />
    </ExternalLink>
    <ExternalLink to="https://www.instagram.com/alazenka">
      <InstaLogo className={iconStyle} />
    </ExternalLink>
    {/*
    <span>
      <ExternalLink>
        <TwitterLogo className={iconStyle} />
      </ExternalLink>
    </span>
    */}
    <ExternalLink to="mailto:andrewlazenka@gmail.com">
      <Email className={iconStyle} />
    </ExternalLink>
    <ExternalLink to="/andrew-lazenka-resume.pdf">
      <Resume className={iconStyle} />
    </ExternalLink>
  </>
)

export default Footer
