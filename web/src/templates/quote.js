import React from 'react'
import { graphql } from 'gatsby'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout-quote'
import Quote from '../components/quote'

export const query = graphql`
  query QuoteQuery($id: String!) {
    quote: sanityQuote(id: { eq: $id }) {
      id
      publishedAt
      quoteNumber
      specification
      validity
      taskRow {
        description
        hours
        fee
      }
    }
  }
`

const QuoteTemplate = props => {
  const { data, errors } = props
  const quote = data && data.quote

  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {quote && <SEO title={quote.quoteNumber || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {quote && <Quote {...quote} />}
    </Layout>
  )
}

export default QuoteTemplate
