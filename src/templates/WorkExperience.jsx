import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { format } from 'date-fns'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Layout from 'src/components/Layout'
import PageHeader from 'src/components/PageHeader'
import Badge from 'src/components/Badge'
import Theme from 'src/components/Theme'
import { InternalLink } from 'src/components/Links'

// https://www.conic.style/
const redBlueGradient =
  'conic-gradient(from -90deg at 25% 115%, #ff0000, #ff0066, #ff00cc, #cc00ff, #6600ff, #0000ff, #0000ff, #0000ff, #0000ff)'
const blueVioletGradient =
  'conic-gradient(from -90deg at 50% -25%, blue, blueviolet)'

export default function SnippetTemplate({ data }) {
  const { frontmatter, html: __html } = data.markdownRemark
  const {
    company,
    position,
    endMonth,
    endYear,
    startMonth,
    startYear,
    technologies,
    languages,
  } = frontmatter

  const startDate = format(new Date(startYear, startMonth), 'MMMM YYYY')
  const endDate = format(new Date(endYear, endMonth), 'MMMM YYYY')
  return (
    <Theme>
      <Helmet title={`${position} at ${company} in ${startYear}`} />
      <Header />
      <Layout>
        <PageHeader>
          <h3 className="text-indigo-500 mb-0">
            <InternalLink to="/work-experience">← Work Experience</InternalLink>
          </h3>
        </PageHeader>
        <h1>{position}</h1>
        <h3 className="font-medium">{company}</h3>
        <h4 className="font-normal">{`${startDate} - ${endDate}`}</h4>
        <div className="flex flex-wrap pt-6">
          {technologies.map(t => (
            <Badge
              style={{
                background: blueVioletGradient,
              }}
            >
              {t}
            </Badge>
          ))}
          {languages.map(l => (
            <Badge
              style={{
                background: redBlueGradient,
              }}
            >
              {l}
            </Badge>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html }} />
      </Layout>
      <Footer />
    </Theme>
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
        technologies
        languages
      }
    }
    file(absolutePath: { eq: $fileAbsolutePath }) {
      birthTime
    }
  }
`
