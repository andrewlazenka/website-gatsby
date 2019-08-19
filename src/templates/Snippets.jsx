import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Code from '../components/Code'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { InternalLink } from '../components/Links'
import PageHeader from '../components/PageHeader'
import Theme from '../components/Theme'
import { ModeProvider } from '../contexts/ModeContext'
import { snippetDateString } from '../util'

const getSnippetCode = baseCodeElement =>
  baseCodeElement.children[0].children[0].value

const PageTitle = styled.h3`
  color: ${props => props.theme.blueColor};
  margin-bottom: 0;
`

const SnippetExcerpt = styled.p`
  font-size: 0.9em;
  border: 1px solid ${props => props.theme.excerptBorder};
  border-radius: 0.75em;
  padding: 0.75em;
  background: ${props => props.theme.excerptBgColor};
  word-break: keep-all;
`

function SnippetTemplate({ data }) {
  const { markdownRemark: post, file } = data
  const { frontmatter, htmlAst } = post
  const { language } = frontmatter
  const baseCodeElement = htmlAst.children.find(
    ({ tagName }) => tagName === 'pre'
  )
  const codeSnippet = getSnippetCode(baseCodeElement)
  return (
    <ModeProvider>
      <Theme>
        <Helmet
          title={`${post.frontmatter.title} | Snippets - Andrew Lazenka`}
        />
        <Header />
        <Layout>
          <PageHeader>
            <PageTitle>
              <InternalLink to="/snippets">← Snippets</InternalLink>
            </PageTitle>
          </PageHeader>
          <main>
            <article>
              <header>
                <h1>{post.frontmatter.title}</h1>
                <div>{`Added ${snippetDateString(file.birthTime)}`}</div>
                <SnippetExcerpt
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </header>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
              <Code codeString={codeSnippet} language={language} />
            </article>
          </main>
        </Layout>
        <Footer />
      </Theme>
    </ModeProvider>
  )
}

export default SnippetTemplate

export const pageQuery = graphql`
  query SnippetByAbsolutePath($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      htmlAst
      excerpt(format: HTML)
      frontmatter {
        keywords
        language
        title
        type
      }
    }
    file(absolutePath: { eq: $fileAbsolutePath }) {
      birthTime
    }
  }
`
