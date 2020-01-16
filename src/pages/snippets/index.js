import React from 'react'
import styled, { css } from 'styled-components'
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
import { ModeProvider } from '../../contexts/ModeContext'
import { generateSnippetPageSlug } from '../../util'

const SearchSnippetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const SnippetFilterLabel = styled.label`
  color: ${props => props.theme.blueColor};
`

const SnippetFilterKey = styled.div`
  color: ${props => props.theme.blueColor};
  text-transform: capitalize;
`

const SnippetFilterValues = styled.div`
  text-transform: uppercase;
`

const SnippetContainer = styled.article`
  margin: 8px 0;
  padding: 16px;
  padding-top: 8px;
`

const SnippetFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SnippetFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const FilterToggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const FilterToggleWrapper = styled.div`
  height: 32px;
  margin: 5px 0;
`

const Aside = styled.aside`
  width: 25%;
  min-width: 175px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const Main = styled.main`
  width: 67%;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

const Input = styled.input`
  box-sizing: border-box;
  height: 32px;
  width: 100%;
  border: 1px solid #dee3e5;
  border-radius: 4px;
  background-color: #f5f6f9;
  color: #000;
  font-size: 16px;
  line-height: 22px;
  padding: 8px;
  margin: 5px 0;

  ::placeholder {
    color: #999;
  }

  :hover {
    background-color: #f7f8fb;
  }

  :focus {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.14);
    background-color: #f7f8fb;
  }
`

const Dropdown = styled.div`
  overflow: hidden;
  height: 32px;
  width: auto;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #eee;
  cursor: pointer;
  position: relative;
  min-width: 100px;
  margin: 5px 0;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);

  select {
    background: ${({ theme }) => theme.bgColor};
    font-size: 14px;
    border: 1px solid #ccc;
    height: 32px;
    border: 0;
    padding-left: 7px;
    color: ${({ theme }) => theme.fontColor};
    transition: color 0.3s ease-in-out;
    width: auto;
    min-width: 100px;
  }
`

const options = {
  shouldSort: true,
  threshold: 0.35,
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
        .map(({ birthTime, excerpt, fileAbsolutePath, frontmatter }) => {
          const slug = generateSnippetPageSlug({ fileAbsolutePath })
          return (
            <SnippetContainer key={slug}>
              <header>
                <InternalLink to={slug} key={slug}>
                  <h3>{`${frontmatter.title}`}</h3>
                </InternalLink>
              </header>
              <p>
                {excerpt}{' '}
                <InternalLink to={slug} key={slug}>
                  View Code →
                </InternalLink>
              </p>
            </SnippetContainer>
          )
        })
    : 'No Snippets found!'
}

function Arrow({ point = 'right' }) {
  let transformStyle = css`
    height: 12px;
    margin-left: 8px;
  `
  if (point === 'down') {
    transformStyle = [
      ...transformStyle,
      css`
        transform: rotate(90deg);
      `,
    ]
  }
  if (point === 'up') {
    transformStyle = [
      ...transformStyle,
      css`
        transform: rotate(270deg);
      `,
    ]
  }
  if (point === 'left') {
    transformStyle = [
      ...transformStyle,
      css`
        transform: rotate(180deg);
      `,
    ]
  }
  return <img src={ArrowRight} alt="Open Close Arrow" css={transformStyle} />
}

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
      <FilterToggleWrapper>
        <FilterToggle onClick={() => toggleFilterOpen(filterKey)}>
          <SnippetFilterKey>{filterKey}</SnippetFilterKey>
          <Arrow point={filtersOpen[filterKey] ? 'down' : 'right'} />
        </FilterToggle>
      </FilterToggleWrapper>
      {filtersOpen[filterKey] && (
        <SnippetFilterContainer>
          {allFilters[filterKey].map(filter => (
            <SnippetFilterValues key={`filter-value-${filter}`}>
              <input
                type="checkbox"
                id={`${filter}-checkbox`}
                checked={appliedFilters.includes(filter)}
                onChange={() => onChange(filter)}
              />
              <label htmlFor={`${filter}-checkbox`}>{filter}</label>
            </SnippetFilterValues>
          ))}
        </SnippetFilterContainer>
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
    <ModeProvider>
      <Theme>
        <Helmet title="Snippets - Andrew Lazenka" />
        <Header />
        <Layout>
          <PageHeader>
            <h1 style={{ marginBottom: 0 }}>Snippets</h1>
          </PageHeader>
          <SearchSnippetWrapper>
            <Aside>
              <SnippetFilterWrapper>
                <Input
                  id="seach-snippets"
                  onChange={e => searchFilteredSnippets(e.target.value)}
                  placeholder="Find a Snippet"
                  type="text"
                />
              </SnippetFilterWrapper>
              <SnippetFilterWrapper>
                <SnippetFilterLabel htmlFor="snippet-sort">
                  Sort
                </SnippetFilterLabel>
                <Dropdown>
                  <select
                    id="snippet-sort"
                    value={snippetSort}
                    onChange={e => setSnippetSort(e.target.value)}
                  >
                    <option value="title-asc">Title A - Z</option>
                    <option value="title-desc">Title Z - A</option>
                  </select>
                </Dropdown>
              </SnippetFilterWrapper>
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
            </Aside>
            <Main>
              <SnippetList snippets={filteredSnippets} sortBy={snippetSort} />
            </Main>
          </SearchSnippetWrapper>
        </Layout>
        <Footer />
      </Theme>
    </ModeProvider>
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