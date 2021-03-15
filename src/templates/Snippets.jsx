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
            <aside className="relative rounded-md border-t-0 border-r-0 border-b-0 border-l-3 border-solid border-indigo-400 bg-blue-100 px-8 py-4 my-4">
              <div className="dark:text-gray-900" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <div className="transition-colors duration-300 ease-in-out absolute top-0 left-0 p-2 text-indigo-400 bg-gray-50 dark:bg-gray-900 rounded-full transform translate-x-[-50%] translate-y-[-50%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="block hover:animate-funBounce"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </aside>
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
