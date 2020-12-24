import React from 'react'
import { format } from 'date-fns'

import { generateSnippetPageSlug } from '../util'
import { InternalLink } from '../components/Links'

function WorkExperience({ frontmatter, fileAbsolutePath }) {
  const {
    company,
    endMonth,
    endYear,
    position,
    startMonth,
    startYear,
  } = frontmatter
  const startDate = format(new Date(startYear, startMonth), 'MMMM YYYY')
  const endDate = format(new Date(endYear, endMonth), 'MMMM YYYY')
  return (
    <div>
      <InternalLink to={generateSnippetPageSlug({ fileAbsolutePath })}>
        <h4 className="mb-2">{`${company} - ${position}`}</h4>
      </InternalLink>
      <p className="mt-2">{`${startDate} - ${endDate}`}</p>
    </div>
  )
}

export default WorkExperience
