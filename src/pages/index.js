import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { isAfter, isBefore } from 'date-fns'
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import Layout from '../components/Layout'
import { ExternalLink, InternalLink } from '../components/Links'
import Theme from '../components/Theme'
import WorkExperience from '../components/WorkExperience'
import { ModeProvider } from '../contexts/ModeContext'

const MAX_WORK_EXP = 3

const AndrewHeadshot = styled(Img)`
  height: 400px;
  width: 277px;
`

const HeroBannerContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: inherit;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;

  @media only screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: center;
    padding-bottom: 16px;
  }
`

const AndrewInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
  justify-content: center;
  max-width: 400px;
  color: rgba(255, 255, 255, 0.88);

  @media only screen and (max-width: 1024px) {
    max-width: 430px;
    text-align: center;
  }
`

const PageMain = styled.main`
  div:nth-child(n + 2) {
    margin-top: 32px;
  }
`

function sortFilterWork(ex1, ex2) {
  const date1 = new Date(ex1.frontmatter.startYear, ex1.frontmatter.startMonth)
  const date2 = new Date(ex2.frontmatter.startYear, ex2.frontmatter.startMonth)
  if (isBefore(date1, date2)) {
    return 1
  }
  if (isAfter(date1, date2)) {
    return -1
  }
  return 0
}

export default function Home({ data }) {
  return (
    <ModeProvider>
      <Theme>
        <Helmet title="Andrew Lazenka" />
        <HeroBanner>
          <Header />
          <HeroBannerContentContainer>
            <AndrewInfoContainer>
              <span>
                Hi, I'm <b>Andrew Lazenka</b>. I love full-stack development,
                architecting robust devops solutions, collaborating, and most of
                all problem solving.
              </span>
            </AndrewInfoContainer>
            <AndrewHeadshot
              fluid={data.andrewHeadshot.childImageSharp.fluid}
              alt="Andrew Headshot"
            />
          </HeroBannerContentContainer>
        </HeroBanner>
        <Layout>
          <PageMain>
            <div>
              <h3>About</h3>
              I'm in my fourth year at Queen's University pursuing a Bachelor in
              Computer Science with a specialization in Software Design.
              <br />
              <br />
              Since May 2018 I've been working at{' '}
              <ExternalLink to="https://www.innovasium.com">
                Innovasium Digital
              </ExternalLink>{' '}
              as a development team lead, doing full-stack web development and
              architecting modern dev ops solutions.{' '}
              <InternalLink to="/work-experience/innovasium-2018">
                Find out more about that here.
              </InternalLink>
              <br />
              <br />
              I have a passion for learning new technologies and
              incorporating them into my work. Right now I am exploring
              highly performant, resilient and scalable backend solutions using
              {' '}
              <ExternalLink to="https://elixir-lang.org/">
                Elixir
              </ExternalLink>
              ,{' '}
              <ExternalLink to="https://golang.org/">
                Go
              </ExternalLink>, and{' '}
              <ExternalLink to="https://rubyonrails.org/">
                Ruby on Rails
              </ExternalLink>.
              For frontend development projects I've been mainly using{' '}
              <ExternalLink to="https://www.gatsbyjs.org">
                GatsbyJS
              </ExternalLink>{' '}
              and{' '}
              <ExternalLink to="https://www.styled-components.com/">
                Styled Components
              </ExternalLink>{' '}
              since I came across them, and they were used to build this site!
              <br />
              <br />
              In my spare time, I enjoy writing my own music as well as open
              source software which you can find on my{' '}
              <ExternalLink to="https://github.com/ALazenka">
                GitHub Page
              </ExternalLink>.
              <br />
              <br />
              I also play guitar in my band{' '}
              <ExternalLink to="https://prettyyoungthangband.com">
                Pretty Young Thang
              </ExternalLink>. Check us out!
            </div>
            <div>
              <h3>Work & Experience</h3>
              {Array.from(data.workExperiences.nodes)
                .sort(sortFilterWork)
                .splice(0, MAX_WORK_EXP)
                .map(workExperience => {
                  const {
                    company,
                    position,
                    startMonth,
                    startYear,
                  } = workExperience.frontmatter
                  return (
                    <WorkExperience
                      key={`${company} - ${position} - ${startMonth} ${startYear}`}
                      {...workExperience}
                    />
                  )
                })}
              <InternalLink to="/work-experience">See more</InternalLink>
            </div>
          </PageMain>
        </Layout>
        <Footer />
      </Theme>
    </ModeProvider>
  )
}

export const pageQuery = graphql`
  query {
    workExperiences: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/src/pages/work-experience/**/*.md" }
      }
    ) {
      nodes {
        frontmatter {
          company
          endMonth
          endYear
          position
          startMonth
          startYear
        }
        fileAbsolutePath
      }
    }
    andrewHeadshot: file(
      relativePath: { glob: "**/png/AndrewHeadshotProfessional.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
