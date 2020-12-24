import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { format } from 'date-fns'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Theme from '../components/Theme'
import { InternalLink } from '../components/Links'
import { ThemeProvider } from '../contexts/ThemeContext'

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

  const startDate = format(new Date(startYear, startMonth), 'MMMM YYYY')
  const endDate = format(new Date(endYear, endMonth), 'MMMM YYYY')
  return (
    <ThemeProvider>
      <Theme>
        <Helmet title={`${title} | Work Experience - Andrew Lazenka`} />
        <Header />
        <Layout>
          <PageHeader>
            <h3 className="text-indigo-500 mb-0">
              <InternalLink to="/work-experience">← Work Experience</InternalLink>
            </h3>
          </PageHeader>
          <h1>{company}</h1>
          <h4>{`${startDate} - ${endDate}`}</h4>
          <div dangerouslySetInnerHTML={{ __html }} />
        </Layout>
        <Footer />
      </Theme>
    </ThemeProvider>
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
