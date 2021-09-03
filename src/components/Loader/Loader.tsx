import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'

import styles from './Loader.module.scss'

const Loader: FC = () => {
  const { url } = useRouteMatch()

  return (
    <div className={`${styles.ldsEllipsis} ${!url.includes('admin') && styles.clientLoader}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
