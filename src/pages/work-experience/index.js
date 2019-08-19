import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { isBefore } from 'date-fns'
import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import Theme from '../../components/Theme'
import WorkExperience from '../../components/WorkExperience'
import { ModeProvider } from '../../contexts/ModeContext'

const PageMain = styled.main`
  div:nth-child(n + 2) {
    margin-top: 32px;
  }
`

function sortFilterWork(ex1, ex2) {
  const date1 = new Date(ex1.frontmatter.startYear, ex1.frontmatter.startMonth)
  const date2 = new Date(ex2.frontmatter.startYear, ex2.frontmatter.startMonth)
  return isBefore(date1, date2) ? 1 : -1
}

export default function Home({ data }) {
  data.workExperiences.nodes.sort(sortFilterWork)

  return (
    <ModeProvider>
      <Theme>
        <Helmet title="Andrew Lazenka" />
        <Header />
        <Layout>
          <PageHeader>
            <h1 style={{ marginBottom: 0 }}>Work Experience</h1>
          </PageHeader>
          <PageMain>
            <div>
              {data.workExperiences.nodes.map(workExperience => {
                const {
                  company,
                  position,
                  startMonth,
                  startYear,
                } = workExperience.frontmatter
                return (
                  <WorkExperience
                    key={`${company} - ${position} - ${startMonth} ${startYear}`}
                    {...workExperience}
                  />
                )
              })}
            </div>
          </PageMain>
        </Layout>
      </Theme>
    </ModeProvider>
  )
}

export const pageQuery = graphql`
  query {
    workExperiences: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/src/pages/work-experience/**/*.md" }
      }
    ) {
      nodes {
        frontmatter {
          company
          endMonth
          endYear
          position
          startMonth
          startYear
        }
        fileAbsolutePath
      }
    }
  }
`
