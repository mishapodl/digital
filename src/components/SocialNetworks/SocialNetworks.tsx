import React, { FC, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SocialNetworks.module.scss'

import { RoutesConfig } from '../../routes/routeConfig'
import { socialNetworksRequest } from '../../redux/socialNetworks/thunks'
import { AppStateType } from '../../redux/store'
import { baseURL } from '../../helpers'

const SocialNetworks: FC = () => {
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const [animate, setAnimate] = useState(false)
  const socialNetworkData = useSelector((state: AppStateType) => state.networks.formData)

  let linkList = [...socialNetworkData].map((elem, index) => {
    if (!elem.url) return
    return (
      <a key={index} href={elem.url} target="_blank" rel="noreferrer">
        {socialNetworkData[0] && <img className={styles.icon} src={baseURL + '/' + elem.iconFileName} alt="" />}
      </a>
    )
  })

  useEffect(() => {
    dispatch(socialNetworksRequest())
  }, [])

  useEffect(() => {
    linkList = [...socialNetworkData].map((elem, index) => {
      if (!elem.url) return
      return (
        <a key={index} href={elem.url} target="_blank" rel="noreferrer">
          {socialNetworkData[0] && <img className={styles.icon} src={baseURL + '/' + elem.iconFileName} alt="" />}
        </a>
      )
    })
  }, [socialNetworkData])

  useEffect(() => {
    const delay = setTimeout(() => {
      setAnimate(true)
    }, 2000)

    return () => clearTimeout(delay)
  }, [])

  // todo map
  return (
    <div
      className={`${styles.socialWrapper} ${url !== RoutesConfig.MainPage && styles.verticalSocialWrapper} ${
        url === RoutesConfig.MainPage && styles.hiddenWrapper
      } ${animate && url === RoutesConfig.MainPage && styles.animatedWrapper}`}
    >
      {linkList}
    </div>
  )
}

export default SocialNetworks
