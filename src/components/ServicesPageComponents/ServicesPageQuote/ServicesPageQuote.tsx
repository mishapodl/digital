import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ServicesPageQuote.module.scss'

import { ReactComponent as QuoteLeft } from '../../../assets/icons/quote-left.svg'
import { ReactComponent as QuoteRight } from '../../../assets/icons/quote-right.svg'
import { TQuote } from '../../../redux/services/types'
import { LangCode } from '../../../helpers'

const ServicesPageQuote: FC<{ quote: TQuote }> = ({ quote }) => {
  const { i18n } = useTranslation()
  return (
    <div className={styles.mainQuoteWrapper}>
      <div className={styles.quoteWrapper}>
        <QuoteLeft />
        <div className={styles.quoteTextWrapper}>
          <div className={styles.quoteUpperText}>{quote[i18n.language.toUpperCase() as LangCode].title}</div>
          <div className={styles.quoteLowerText}>{quote[i18n.language.toUpperCase() as LangCode].subTitle}</div>
        </div>
        <div className={styles.rightQuoteAlign}>
          <QuoteRight />
        </div>
      </div>
    </div>
  )
}

export default ServicesPageQuote
