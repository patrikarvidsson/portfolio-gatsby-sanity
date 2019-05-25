import React from 'react'
import logo from '../images/logo.flat.svg'

import styles from './quote.module.css'

const ReactMarkdown = require('react-markdown')

function Quote (props) {
  const { quoteNumber, specification, validity, taskRow } = props

  var total =
    props.taskRow[0].fee * props.taskRow[0].hours +
    props.taskRow[1].fee * props.taskRow[1].hours +
    props.taskRow[2].fee * props.taskRow[2].hours +
    props.taskRow[3].fee * props.taskRow[3].hours
  var taxNumber = 0.25
  var tax = taxNumber * total

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt='Quote' />
        <div className={styles.noMargins}>
          <p className={styles.bold}>Quote #</p>
          <p>{props.quoteNumber}</p>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.quoteSectionTitle}>Specifications (1.1)</h2>
        <ReactMarkdown className={styles.paragraph} source={props.specification} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.quoteSectionTitle}>Validity (1.2)</h2>
        <ReactMarkdown className={styles.paragraph} source={props.validity} />
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.bold}>Description</div>
          <div className={styles.bold}>Amount</div>
          <div className={styles.bold}>Fee</div>
          <div className={styles.bold}>Total</div>
        </div>
        {props.taskRow.map(quote => (
          <div className={styles.grid} key={quote.description}>
            <div>{quote.description}</div>
            <div>{quote.hours}</div>
            <div>{quote.fee} SEK</div>
            <div>{quote.fee * quote.hours} SEK</div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div>Total: {total} SEK</div>
        <div>Tax: {tax} SEK</div>
        <div>Amount to pay: {tax + total} SEK</div>
      </section>

      <section className={styles.section}>
        <h2>Contact information</h2>
        <p className={styles.paragraph}>
          For questions or concerns you are welcome to call me at 073-514 60 10 or send an email to{' '}
          <a href='mailto:patrik@patrikarvidsson.com'>patrik@patrikarvidsson.com</a> and I'll get back to you as soon as
          possible.
        </p>
      </section>
    </div>
  )
}

export default Quote
