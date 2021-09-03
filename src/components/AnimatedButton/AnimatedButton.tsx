import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import styles from './AnimatedButton.module.scss'

import { ReactComponent as Arrow } from '../../assets/icons/header-arrow.svg'

interface IAnimatedButton {
  name: string
  url: string
}

const AnimatedButton: FC<IAnimatedButton> = ({ name, url }) => {
  const buttonIsStatic = useMediaQuery({
    query: '(max-width: 768px)',
  })
  return (
    <div className={styles.animatedButton}>
      <Link to={url}>
        <button>
          <span>{name}</span>
          {!buttonIsStatic ? (
            <span className={styles.arrowContainer}>
              <span className={styles.arrowContent}>
                <Arrow />
                <Arrow />
              </span>
            </span>
          ) : (
            <span className={styles.arrowContainer}>
              <span>
                <Arrow />
                <Arrow />
              </span>
            </span>
          )}
        </button>
      </Link>
    </div>
  )
}

export default AnimatedButton
