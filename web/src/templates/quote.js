import { graphql } from 'gatsby'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout-quote'

import styles from './quote.module.css'

import logo from '../images/logo.flat.svg'
const React = require('react')
const ReactMarkdown = require('react-markdown')

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

  var total =
    quote.taskRow[0].fee * quote.taskRow[0].hours +
    quote.taskRow[1].fee * quote.taskRow[1].hours +
    quote.taskRow[2].fee * quote.taskRow[2].hours +
    quote.taskRow[3].fee * quote.taskRow[3].hours
  var taxNumber = 0.25
  var tax = taxNumber * total

  return (
    <Layout>
      <div className={styles.container}>
        {errors && <SEO title='GraphQL Error' />}
        {quote && <SEO title={quote.quoteNumber || 'Untitled'} />}

        {errors && (
          <Container>
            <GraphQLErrorList errors={errors} />
          </Container>
        )}

        <header>
          <img className={styles.logo} src={logo} alt='Quote' />
          <div className={styles.noMargins}>
            <p className={styles.bold}>Quote #</p>
            <p>{quote.quoteNumber}</p>
          </div>
        </header>

        <section>
          <h2>Specifications (1.1)</h2>
          <ReactMarkdown source={quote.specification} />
        </section>

        <section>
          <h2>Validity (1.2)</h2>
          <ReactMarkdown source={quote.validity} />
        </section>

        <section>
          <div className={styles.grid}>
            <div className={styles.bold}>Description</div>
            <div className={styles.bold}>Amount</div>
            <div className={styles.bold}>Fee</div>
            <div className={styles.bold}>Total</div>
          </div>
          {quote.taskRow.map(quote => (
            <div className={styles.grid} key={quote.description}>
              <div>{quote.description}</div>
              <div>{quote.hours}</div>
              <div>{quote.fee} SEK</div>
              <div>{quote.fee * quote.hours} SEK</div>
            </div>
          ))}
        </section>

        <section>
          <div>Total: {total} SEK</div>
          <div>Tax: {tax} SEK</div>
          <div>Amount to pay: {tax + total} SEK</div>
        </section>

        <section>
          <h2>Contact information</h2>
          <p>
            For questions or concerns you are welcome to call me at 073-514 60 10 or send an email to{' '}
            <a href='mailto:patrik@patrikarvidsson.com'>patrik@patrikarvidsson.com</a> and I'll get back to you as soon
            as possible.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default QuoteTemplate
