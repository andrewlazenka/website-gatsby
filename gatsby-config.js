const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Andrew Lazenka',
    siteUrl: `https://andrewlazenka.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `pages`, `snippets`),
        name: `snippets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `pages`, `work-experience`),
        name: `work-experience`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!--more-->`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`montserrat\:400,700`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Andrew Lazenka`,
        short_name: `Andrew Lazenka`,
        start_url: `/`,
        background_color: `#0aa1d2`,
        theme_color: `#0aa1d2`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
      display: `swap`,
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_TRACKING_ID,
        head: true,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'andrewlazenka.com',
      },
    },
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-postcss'
  ],
}
