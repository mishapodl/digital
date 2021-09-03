import React, { FC } from 'react'

import styles from './CasesPage.module.scss'

interface TSocnet {
  name: string
  link: string
}

interface Props {
  socNet: any
}

const SocialNetworks: FC<Props> = ({ socNet }) => {
  const getSocialNetworks = () => {
    const socialNetworks: TSocnet[] = []
    Object.entries(socNet.languages.EN).forEach((s) => {
      s.forEach((e: any) => {
        if (e.includes('http')) {
          const name = s[0].charAt(0).toUpperCase() + s[0].slice(1)
          socialNetworks.push({ name, link: s[1] as string })
        }
      })
    })
    return socialNetworks
  }

  return (
    <ul className={styles.socNet}>
      {getSocialNetworks().map(({ name, link }, i) => {
        if (name === 'Website') return null
        return (
          <li key={i}>
            <span className={styles[name?.toLocaleLowerCase()]}>
              <span>{name}</span>
            </span>
            <a href={link} target="_blank" rel="noreferrer" className={styles[name?.toLocaleLowerCase()]}>
              <span>{name}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
export default SocialNetworks
