import React, { FC } from 'react'
import { useMediaQuery } from 'react-responsive'

import styles from '../RequestsPage.module.scss'
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg'

type TProps = {
  name: string
  phone: string
  receivedIn: string
  email?: string
  cv?: string
  isCVPage?: boolean
}

export const Request: FC<TProps> = ({ name, phone, email, cv, receivedIn, isCVPage }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  const date = receivedIn.replace(/T/, ' / ').replace(/\..+/, '')

  const cvFile = cv?.substring(53, cv.length)

  return (
    <div className={styles.requestWrapper}>
      <div>
        <div>
          <p className={styles.key}>{isMobile ? 'Ім’я: ' : 'Прізвище та Ім’я: '}</p>
          <p className={styles.value}>{name}</p>
        </div>

        <div>
          <p className={styles.key}>Телефон: </p>
          <p className={styles.value}>{phone}</p>
        </div>

        {isCVPage ? (
          <div>
            <p className={styles.key}>CV: </p>
            <a
              download={true}
              href={cv}
              rel="noopener noreferrer"
              target="_blank"
              className={`${styles.value} ${styles.link}`}
            >
              <p>{cvFile}</p>
              <DownloadIcon />
            </a>
          </div>
        ) : (
          <div>
            <p className={styles.key}>E-mail: </p>
            <p className={styles.value}>{email}</p>
          </div>
        )}

        {isMobile && (
          <div>
            <p className={styles.key}>Дата: </p>
            <p className={styles.value}>{date}</p>
          </div>
        )}
      </div>

      {!isMobile && (
        <div>
          <p className={styles.value}>{date}</p>
        </div>
      )}
    </div>
  )
}
