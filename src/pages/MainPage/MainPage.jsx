import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import styles from './MainPage.module.scss'

import SocialNetworks from '../../components/SocialNetworks'
import { ReactComponent as Logo } from '../../assets/icons/main-logo.svg'
import Header from '../../components/Header'
import { getMainTexts } from '../../redux/mainPage/thunks'
import { selectMainPage } from '../../redux/mainPage/selectors'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${-x / 30}px,${-y / 30}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8}px,${y / 8}px,0)`
const trans3 = (x, y) => `translate3d(${x / 15}px,${y / 15}px,0)`
const trans4 = (x, y) => `translate3d(${x / 25}px,${y / 25}px,0)`

const MainPage = () => {
  const d = useDispatch()
  const { i18n } = useTranslation()
  const { texts } = useSelector(selectMainPage)

  useEffect(() => {
    if (!texts.EN) d(getMainTexts())
  }, [])

  const mainInfo = {
    title: 'Platform Digital Agency',
    description: texts?.[i18n.language.toUpperCase()],
  }

  const [animateLogo, setAnimateLogo] = useState(false)
  const [animateText, setAnimateText] = useState(false)
  const [animateMain, setAnimateMain] = useState(false)
  const [animate2, setAnimate2] = useState(false)
  const [animate3, setAnimate3] = useState(false)
  const [animate4, setAnimate4] = useState(false)
  const [animate5, setAnimate5] = useState(false)
  const [animate6, setAnimate6] = useState(false)
  const [animate7, setAnimate7] = useState(false)
  const [animate8, setAnimate8] = useState(false)

  useEffect(() => {
    const delayLogo = setTimeout(() => {
      setAnimateLogo(true)
    }, 800)

    const delayText = setTimeout(() => {
      setAnimateText(true)
    }, 1000)

    const delayMain = setTimeout(() => {
      setAnimateMain(true)
    }, 3300)

    const delay2 = setTimeout(() => {
      setAnimate2(true)
    }, 3550)

    const delay3 = setTimeout(() => {
      setAnimate3(true)
    }, 3750)

    const delay4 = setTimeout(() => {
      setAnimate4(true)
    }, 3900)

    const delay5 = setTimeout(() => {
      setAnimate5(true)
    }, 4000)

    const delay6 = setTimeout(() => {
      setAnimate6(true)
    }, 4070)

    const delay7 = setTimeout(() => {
      setAnimate7(true)
    }, 4120)

    const delay8 = setTimeout(() => {
      setAnimate8(true)
    }, 4170)

    return () => {
      clearTimeout(delayLogo)
      clearTimeout(delayText)
      clearTimeout(delayMain)
      clearTimeout(delay2)
      clearTimeout(delay3)
      clearTimeout(delay4)
      clearTimeout(delay5)
      clearTimeout(delay6)
      clearTimeout(delay7)
      clearTimeout(delay8)
    }
  }, [])

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  const tablet = useMediaQuery({
    query: '(max-width: 768px)',
  })

  const mobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  return (
    <div className={styles.boxLimiter} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <Header fixed={false} onAnimate={true} />
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          {!tablet ? (
            <Logo className={`${animateLogo && styles.animatedWrapper}`} />
          ) : (
            <div className={`${styles.logoWrapper} ${animateLogo && styles.animatedWrapper}`}>
              <Logo />
              <img src="./images/platform-img.png" alt="platform" />
            </div>
          )}

          <div className={`${styles.textBlock} ${animateText && styles.animatedWrapper}`}>
            <p>
              <span>{mainInfo.title}</span> {mainInfo.description}
            </p>
          </div>
        </div>

        {mobile && (
          <div className={styles.ballImg}>
            <img src="./images/ball-small.png" alt="ball" />
          </div>
        )}

        <SocialNetworks />

        <animated.div
          className={`${styles.card} ${animateMain && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans1) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card2} ${animate4 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans3) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card3} ${animate5 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans2) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card4} ${animate7 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans3) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card5} ${animate3 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans4) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card6} ${animate6 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans4) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card7} ${animate2 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans3) }}
        />
        <animated.div
          className={`${styles.card} ${styles.card8} ${animate8 && styles.cardVisible}`}
          style={{ transform: props.xy.interpolate(trans4) }}
        />
      </div>
    </div>
  )
}

export default MainPage
