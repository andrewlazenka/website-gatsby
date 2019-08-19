import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { generateSnippetPageSlug } from '../util'
import { InternalLink } from '../components/Links'

const H4 = styled.h4`
  margin-bottom: 8px;
`

const FrontmatterDate = styled.p`
  margin-top: 8px;
`

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
        <H4>{`${company} - ${position}`}</H4>
      </InternalLink>
      <FrontmatterDate>{`${startDate} - ${endDate}`}</FrontmatterDate>
    </div>
  )
}

export default WorkExperience
