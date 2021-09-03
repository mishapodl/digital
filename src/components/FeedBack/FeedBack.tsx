import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import s from './FeedBack.module.scss'

import ArrowIcon from '../../assets/icons/go-there-arrow.svg'
import SocialNetworks from '../../components/SocialNetworks'
import { TDataCareerText } from '../../redux/career/types'
import { LangCode } from '../../helpers'

export type TFeedBack = {
  text: TDataCareerText
}

export const FeedBack: FC<TFeedBack> = ({ children, text }) => {
  const { i18n } = useTranslation()

  return (
    <main className={`${s.wrapper}`}>
      <SocialNetworks />
      <section className={s.textSide}>
        <h1 className={s.title}>{text?.[i18n.language.toUpperCase() as LangCode].title}</h1>
        <p className={s.subtitle}>{text?.[i18n.language.toUpperCase() as LangCode].subtitle}</p>
        <img src={ArrowIcon} className={s.arrow} />
      </section>
      {children}
    </main>
  )
}
