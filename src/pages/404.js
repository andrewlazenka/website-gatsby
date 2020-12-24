import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'
import Layout from '../components/Layout'
import Theme from '../components/Theme'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function PageNotFound() {
  return (
    <ThemeProvider>
      <Theme>
        <Helmet title="Page Not Found - Andrew Lazenka" />
        <Header />
        <Layout>
          <h1>Page Not Found</h1>
          Oops! Looks like you're going to a page that doesn't exist.
        </Layout>
      </Theme>
    </ThemeProvider>
  )
}
