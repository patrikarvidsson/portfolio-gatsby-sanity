import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'
import { thin } from '../components/container.module.css'

export const query = graphql`
  query ProjectsPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)projects/" }) {
      id
      _id
      title
      _rawBody
    }
    projects: allSanityProject(limit: 12, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          mainImage {
            asset {
              fluid(maxWidth: 300, maxHeight: 200) {
                ...GatsbySanityImageFluid
              }
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            _id
            title
          }
        }
      }
    }
  }
`

const ProjectsPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)

  return (
    <Layout>
      <SEO hidden title='Projects' />
      <Container>
        <div className={thin}>
          <h1 className={responsiveTitle1}>{page.title}</h1>
          <BlockContent blocks={page._rawBody || []} />
        </div>
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  )
}

export default ProjectsPage
