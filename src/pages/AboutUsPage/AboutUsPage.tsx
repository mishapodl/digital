import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import styles from './AboutUsPage.module.scss'

import SocialNetworks from '../../components/SocialNetworks'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { getAboutUsInfo } from '../../redux/aboutUs/selectors'
import { aboutUsInfoRequest } from '../../redux/aboutUs/thunks'
import { LangCode } from '../../helpers'
import Loader from '../../components/Loader'

const AboutUsPage: FC = () => {
  const { i18n } = useTranslation()

  const dispatch = useDispatch()
  const { texts, isFetching } = useSelector(getAboutUsInfo)

  useEffect(() => {
    dispatch(aboutUsInfoRequest())
  }, [])

  const textWithSpaces = texts?.[i18n.language.toUpperCase() as LangCode].replace(/  /g, '\u00A0\u00A0')

  return isFetching ? (
    <Loader />
  ) : (
    <div className="container">
      <article className={styles.aboutUsContent}>
        <SocialNetworks />
        <PageTitle name={'admin.aboutUs'} />
        <div className={styles.image}></div>
        <div className={styles.text}>
          <p>{textWithSpaces}</p>
        </div>
      </article>
    </div>
  )
}

export default AboutUsPage
