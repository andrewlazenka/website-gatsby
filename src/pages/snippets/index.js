import React from 'react'
import clsx from 'classnames'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Fuse from 'fuse.js'

import ArrowRight from '../../assets/svg/arrow-right.svg'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout'
import { InternalLink } from '../../components/Links'
import PageHeader from '../../components/PageHeader'
import Theme from '../../components/Theme'
import { generateSnippetPageSlug } from '../../util'

const options = {
  shouldSort: true,
  threshold: 0.28,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'frontmatter.keywords',
    'frontmatter.language',
    'frontmatter.title',
    'frontmatter.type',
  ],
}

function useFuseSearch(initialArr, searchOptions) {
  const [filteredArr, setFilteredArr] = React.useState(initialArr)

  function searchArr(search) {
    if (search === '') {
      setFilteredArr(initialArr)
    } else {
      const fuse = new Fuse(initialArr, searchOptions)
      const matchedSnippets = fuse.search(search)
      console.log(matchedSnippets)
      setFilteredArr(matchedSnippets)
    }
  }

  return [filteredArr, searchArr]
}

function createFilters(snippets) {
  const filterObj = {}
  snippets.forEach(({ frontmatter }) => {
    Object.keys(frontmatter).forEach(fmKey => {
      if (!filterObj[fmKey]) {
        filterObj[fmKey] = []
      }
      if (Array.isArray(frontmatter[fmKey])) {
      } else {
        if (
          !filterObj[fmKey].includes(frontmatter[fmKey]) &&
          Boolean(frontmatter[fmKey])
        ) {
          filterObj[fmKey].push(frontmatter[fmKey])
        }
      }
    })
  })
  // remove unused frontmatter fields, not used as filters
  delete filterObj.title
  delete filterObj.keywords
  // sort filters alpha
  Object.keys(filterObj).forEach(filterKey => {
    filterObj[filterKey].sort((a, b) => (a > b ? 1 : -1))
  })
  return filterObj
}

function filterReducer(state, action) {
  const updatedState = [...state]
  switch (action.type) {
    case 'add':
      updatedState.push(action.filter)
      return updatedState
    case 'remove':
      const index = updatedState.indexOf(action.filter)

      if (index > -1) {
        updatedState.splice(index, 1)
      }
      return updatedState
    default:
      throw new Error()
  }
}

function applyFilters(snippets, snippetFilters) {
  return snippets.filter(({ frontmatter }) => {
    const values = []
    Object.keys(frontmatter).forEach(fmKey => {
      if (Array.isArray(frontmatter[fmKey])) {
      } else {
        if (snippetFilters.includes(frontmatter[fmKey])) {
          values.push(true)
        } else {
          values.push(false)
        }
      }
    })
    return values.includes(true)
  })
}

function SnippetList({ snippets, sortBy }) {
  function sortSnippets(s1, s2) {
    switch (sortBy) {
      case 'title-asc':
        return s2.frontmatter.title.toLowerCase() <
          s1.frontmatter.title.toLowerCase()
          ? 1
          : -1
      case 'title-desc':
        return s1.frontmatter.title.toLowerCase() <
          s2.frontmatter.title.toLowerCase()
          ? 1
          : -1
      default:
        break
    }
  }

  return snippets.length > 0
    ? snippets
        .sort(sortSnippets)
        .map(({ excerpt, fileAbsolutePath, frontmatter }) => {
          const slug = generateSnippetPageSlug({ fileAbsolutePath })
          return (
            <article className="my-2 p-4 pt-2" key={slug}>
              <header>
                <InternalLink to={slug} key={slug}>
                  <h3>{`${frontmatter.title}`}</h3>
                </InternalLink>
              </header>
              <p className="m-0">
                {excerpt}
              </p>
            </article>
          )
        })
    : 'No Snippets found!'
}

const Arrow = ({ point = 'right' }) => (
  <img
    src={ArrowRight}
    className={clsx(
      'h-3 ml-2 transition-transform duration-100 ease-in-out',
      { 'transform rotate-90': point === 'down' },
      { 'transform rotate-270': point === 'up' },
      { 'transform rotate-180': point === 'left' },
    )}
    alt="Open Close Arrow"
  />
)

function SnippetFilters({ allFilters, appliedFilters, onChange }) {
  const [filtersOpen, setFiltersOpen] = React.useState({})

  function toggleFilterOpen(filter) {
    const filterState = filtersOpen[filter] ? false : true
    setFiltersOpen({
      ...filtersOpen,
      [filter]: filterState,
    })
  }

  return Object.keys(allFilters).map(filterKey => (
    <React.Fragment key={`filter-${filterKey}`}>
      <div className="h-8 my-3">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilterOpen(filterKey)}
        >
          <div className="text-indigo-500 capitalize">{filterKey}</div>
          <Arrow point={filtersOpen[filterKey] ? 'down' : 'right'} />
        </div>
      </div>
      {filtersOpen[filterKey] && (
        <div className="flex flex-col flex-wrap">
          {allFilters[filterKey].map(filter => (
            <div
              className={filterKey === 'language' ? 'uppercase' : 'capitalize'}
              key={`filter-value-${filter}`}
            >
              <input
                type="checkbox"
                id={`${filter}-checkbox`}
                checked={appliedFilters.includes(filter)}
                onChange={() => onChange(filter)}
              />
              <label htmlFor={`${filter}-checkbox`}>{filter}</label>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  ))
}

export default function SnippetSearch({ data }) {
  const snippets = data.snippets.edges.map(snippet => snippet.node)
  const filters = createFilters(snippets)
  const [snippetFilters, setSnippetFilters] = React.useReducer(
    filterReducer,
    []
  )
  const [snippetSort, setSnippetSort] = React.useState('title-asc')
  let [filteredSnippets, searchFilteredSnippets] = useFuseSearch(
    snippets,
    options
  )
  if (snippetFilters.length > 0) {
    filteredSnippets = applyFilters(filteredSnippets, snippetFilters)
  }

  return (
    <Theme>
      <Helmet title="Snippets - Andrew Lazenka" />
      <Header />
      <Layout>
        <PageHeader>
          <h1 style={{ marginBottom: 0 }}>Snippets</h1>
        </PageHeader>
        <div className="flex justify-between flex-col md:flex-row">
          <aside className="w-full md:w-1/4" style={{ minWidth: 175 }}>
            <div className="flex justify-between items-center">
              <input
                id="seach-snippets"
                className="snippets-input"
                onChange={e => searchFilteredSnippets(e.target.value)}
                placeholder="Find a snippet"
                type="text"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-indigo-500" htmlFor="snippet-sort">
                Sort
              </label>
              <div className="snippets-dropdown">
                <select
                  id="snippet-sort"
                  value={snippetSort}
                  onChange={e => setSnippetSort(e.target.value)}
                >
                  <option value="title-asc">Title A - Z</option>
                  <option value="title-desc">Title Z - A</option>
                </select>
              </div>
            </div>
            <SnippetFilters
              allFilters={filters}
              appliedFilters={snippetFilters}
              onChange={filter => {
                if (snippetFilters.includes(filter)) {
                  setSnippetFilters({ type: 'remove', filter })
                } else {
                  setSnippetFilters({ type: 'add', filter })
                }
              }}
            />
          </aside>
          <main className="w-full md:w-4/6">
            <SnippetList snippets={filteredSnippets} sortBy={snippetSort} />
          </main>
        </div>
      </Layout>
      <Footer />
    </Theme>
  )
}

export const pageQuery = graphql`
  {
    snippets: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/pages/snippets/**/*.md" } }
    ) {
      edges {
        node {
          fileAbsolutePath
          excerpt(format: MARKDOWN)
          frontmatter {
            title
            type
            keywords
            language
          }
        }
      }
    }
  }
`
