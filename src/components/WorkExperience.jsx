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
    <article className="py-3 px-4 pl-0">
      <InternalLink to={generateSnippetPageSlug({ fileAbsolutePath })}>
        <h3>{position}</h3>
      </InternalLink>
      <h4>{company}</h4>
      <p className="m-0">{`${startDate} - ${endDate}`}</p>
    </article>
  )
}

export default WorkExperience
