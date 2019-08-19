const path = require('path')
const { generateSnippetPageSlug } = require('./src/util')
const SnippetTemplate = path.resolve('src/templates/Snippets.jsx')
const WorkExperienceTemplate = path.resolve('src/templates/WorkExperience.jsx')

function getSnippets({ actions, graphql }) {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/src/pages/snippets/**/*.md" } }
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log('snippet page errors', result.errors)
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { fileAbsolutePath } = node
      createPage({
        path: generateSnippetPageSlug(node),
        context: {
          fileAbsolutePath,
        },
        component: SnippetTemplate,
      })
    })
  })
}

function getWorkExperience({ actions, graphql }) {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/work-experience/**/*.md" }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log('work experience page errors', result.errors)
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { fileAbsolutePath } = node
      createPage({
        path: generateSnippetPageSlug(node),
        context: {
          fileAbsolutePath,
        },
        component: WorkExperienceTemplate,
      })
    })
  })
}

exports.createPages = gatsbyParams => {
  const snippets = getSnippets(gatsbyParams)
  const workExperience = getWorkExperience(gatsbyParams)

  return Promise.all([snippets, workExperience])
}
