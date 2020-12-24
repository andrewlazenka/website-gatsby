import React from 'react'
import Tooltip from '@reach/tooltip'

import InstaLogo from '../assets/svg/instagram.inline.svg'
import GitHubLogo from '../assets/svg/github.inline.svg'
import LinkedInLogo from '../assets/svg/linkedin.inline.svg'
// import TwitterLogo from '../assets/svg/twitter.inline.svg'
import Email from '../assets/svg/email.inline.svg'
import Resume from '../assets/svg/inbox.inline.svg'
import { ExternalLink } from '../components/Links'

function Footer() {
  return (
    <React.Fragment>
      <Tooltip label="GitHub">
        <span>
          <ExternalLink to="https://github.com/ALazenka">
            <GitHubLogo className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip>
      <Tooltip label="LinkedIn">
        <span>
          <ExternalLink to="https://www.linkedin.com/in/andrewlazenka">
            <LinkedInLogo className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip>
      <Tooltip label="Instagram">
        <span>
          <ExternalLink to="https://www.instagram.com/alazenka/">
            <InstaLogo className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip>
      {/* <Tooltip label="Twitter">
        <span>
          <ExternalLink>
            <TwitterLogo className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip> */}
      <Tooltip label="Email">
        <span>
          <ExternalLink to="mailto:andrewlazenka@gmail.com">
            <Email className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip>
      <Tooltip label="Resumé">
        <span>
          <ExternalLink to="/AndrewLazenkaResume.pdf">
            <Resume className="h-6 w-6" />
          </ExternalLink>
        </span>
      </Tooltip>
    </React.Fragment>
  )
}

export default Footer
