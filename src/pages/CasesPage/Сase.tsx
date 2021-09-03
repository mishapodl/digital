import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './CasesPage.module.scss'
import SocialNetworks from './SocialNetworks'

interface Props {
  c: any
}

const Сase: PropsWithChildren<any> = ({ c }: Props) => {
  const { t, i18n } = useTranslation()
  const { name, activity, description, services } = c.languages[i18n.language.toUpperCase()]
  const { website } = c.languages.EN

  return (
    <article className={styles.case}>
      <div className={styles.caseMedia}>
        <div className={`${styles.caseImage} ${website.includes('http') && `${styles.hover}`}`}>
          {website.includes('http') ? (
            <a href={website}>
              <img src={c.img} alt={`case-${c.order}`} />
            </a>
          ) : (
            <span>
              <img src={c.img} alt={`case-${c.order}`} />
            </span>
          )}
        </div>
        <SocialNetworks socNet={c} />
      </div>
      <div className={styles.caseDescription}>
        <h3>{name}</h3>
        <span>{activity}</span>
        <p>{description}</p>
        <h3>{t('cases.client')}</h3>
        <ul>{services?.map((s: any, i: number) => s && <li key={i}>{s}</li>)}</ul>
      </div>
    </article>
  )
}

export default Сase
