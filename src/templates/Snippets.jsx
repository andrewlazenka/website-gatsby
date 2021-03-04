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

const getSnippetCode = baseCodeElement =>
  baseCodeElement.children[0].children[0].value

function SnippetTemplate({ data }) {
  const { markdownRemark: post } = data
  const { frontmatter, htmlAst } = post
  const { language } = frontmatter
  const baseCodeElement = htmlAst.children.find(
    ({ tagName }) => tagName === 'pre'
  )
  const codeSnippet = getSnippetCode(baseCodeElement)
  return (
    <Theme>
      <Helmet title={`${post.frontmatter.title}`} />
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
            {/* <section className="py-2 font-light">{`Added ${snippetDateString(
              file.birthTime
            )}`}</section> */}
            <section
              className="rounded-l-sm border-t-0 border-r-0 border-b-0 border-l-3 border-solid border-indigo-400 px-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <Code codeString={codeSnippet} language={language} />
          </article>
        </main>
      </Layout>
      <Footer />
    </Theme>
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
