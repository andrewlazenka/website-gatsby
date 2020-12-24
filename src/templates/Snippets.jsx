import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Code from '../components/Code'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import { InternalLink } from '../components/Links'
import PageHeader from '../components/PageHeader'
import Theme from '../components/Theme'
import { ThemeProvider } from '../contexts/ThemeContext'
import { snippetDateString } from '../util'

const getSnippetCode = baseCodeElement =>
  baseCodeElement.children[0].children[0].value

function SnippetTemplate({ data }) {
  const { markdownRemark: post, file } = data
  const { frontmatter, htmlAst } = post
  const { language } = frontmatter
  const baseCodeElement = htmlAst.children.find(
    ({ tagName }) => tagName === 'pre'
  )
  const codeSnippet = getSnippetCode(baseCodeElement)
  return (
    <ThemeProvider>
      <Theme>
        <Helmet
          title={`${post.frontmatter.title} Snippet - Andrew Lazenka`}
        />
        <Header />
        <Layout>
          <PageHeader>
            <InternalLink className="text-indigo-500 mb-0" to="/snippets">
              ← Snippets
            </InternalLink>
          </PageHeader>
          <main>
            <article>
              <header>
                <h1 className="mb-0 py-2">{post.frontmatter.title}</h1>
              </header>
              <section className="py-2 font-light">{`Added ${snippetDateString(file.birthTime)}`}</section>
              <section
                className="rounded-md bg-indigo-300 border-solid border-indigo-400 px-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <section dangerouslySetInnerHTML={{ __html: post.html }} />
              <Code codeString={codeSnippet} language={language} />
            </article>
          </main>
        </Layout>
        <Footer />
      </Theme>
    </ThemeProvider>
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
