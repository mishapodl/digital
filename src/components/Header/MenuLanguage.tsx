import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Header.module.scss'

const MenuLanguage = () => {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<string>(i18n.language)
  const [drop, setDrop] = useState<boolean>(false)

  const changeLanguageHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { dataset, textContent }: any = e.target
    e.stopPropagation()

    if (dataset.lang) {
      if (textContent === 'ua') {
        i18n.changeLanguage('ua')
      }
      if (textContent === 'ru') {
        i18n.changeLanguage('ru')
      }
      if (textContent === 'en') {
        i18n.changeLanguage('en')
      }
      setLang(textContent || '')
      setDrop(false)
    }
  }

  useEffect(() => {
    const hideDropMenu = (e: MouseEvent) => {
      const { dataset }: any = e.target
      if (!dataset.activeLang) {
        setDrop(false)
      }
    }

    document.body.addEventListener('click', hideDropMenu)
    return () => {
      document.body.removeEventListener('click', hideDropMenu)
    }
  }, [])

  return (
    <div className={styles.customSelect}>
      <div className={styles.select} data-drop-lang="dropLang" onClick={() => setDrop(true)}>
        <div className={styles.activeLang} data-active-lang="active">
          {lang}
        </div>
        <div className={`${styles.dropMenu} ${drop ? styles.show : ''}`} onClick={changeLanguageHandler}>
          <div data-lang="lang" className={styles.lang}>
            ua
          </div>
          <div data-lang="lang" className={styles.lang}>
            ru
          </div>
          <div data-lang="lang" className={styles.lang}>
            en
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuLanguage
