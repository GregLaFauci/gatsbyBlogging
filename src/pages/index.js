import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import Img from 'gatsby-image'
import Carousel from 'react-bootstrap/Carousel'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const images = data.allFile.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      
      <Carousel className="full-width-md d-none d-md-block" indicators={false}>
      {images.map(pic =>
        <Carousel.Item>
          <Img fixed={pic.node.childImageSharp.fixed}/>
        </Carousel.Item>
        )}
      </Carousel>
      
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html:  node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      {/* <Bio /> */}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    allFile(filter: {
      extension: {regex: "/(jpg)|(jpeg)/"}
    }) {
      edges {
        node {
          childImageSharp {
            fixed (width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
