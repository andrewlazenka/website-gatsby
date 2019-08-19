import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { format } from 'date-fns'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Theme from '../components/Theme'
import { ModeProvider } from '../contexts/ModeContext'

const WorkTemplateContainer = styled.div``

const PageTitle = styled.h3`
  color: ${props => props.theme.blueColor};
  margin-bottom: 0;
`

export default function SnippetTemplate({ data }) {
  const { frontmatter, html: __html } = data.markdownRemark
  const {
    company,
    endMonth,
    endYear,
    startMonth,
    startYear,
    title,
  } = frontmatter
  console.log(title)
  const startDate = format(new Date(startYear, startMonth), 'MMMM YYYY')
  const endDate = format(new Date(endYear, endMonth), 'MMMM YYYY')
  return (
    <ModeProvider>
      <Theme>
        <Helmet title={`${title} | Work Experience - Andrew Lazenka`} />
        <Header />
        <Layout>
          <PageHeader>
            <PageTitle>
              <Link to="/work-experience">← Work Experience</Link>
            </PageTitle>
          </PageHeader>
          <h1>{company}</h1>
          <h4>{`${startDate} - ${endDate}`}</h4>
          <WorkTemplateContainer dangerouslySetInnerHTML={{ __html }} />
        </Layout>
        <Footer />
      </Theme>
    </ModeProvider>
  )
}

export const pageQuery = graphql`
  query WorkExperienceByAbsolutePath($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      htmlAst
      html
      excerpt(format: HTML)
      frontmatter {
        company
        title
        endMonth
        endYear
        startMonth
        startYear
        position
      }
    }
    file(absolutePath: { eq: $fileAbsolutePath }) {
      birthTime
    }
  }
`
