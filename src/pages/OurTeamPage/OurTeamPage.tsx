import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from './OurTeamPage.module.scss'
import { Member } from './components/Member'

import SocialNetworks from '../../components/SocialNetworks'
import { teamGET } from '../../redux/ourTeam/thunks'
import Loader from '../../components/Loader'
import { selectOurTeam } from '../../redux/ourTeam/selectors'

const OurTeamPage: FC = () => {
  const d = useDispatch()

  const { team, isFetching } = useSelector(selectOurTeam)

  useEffect(() => {
    if (!team.length) d(teamGET())
  }, [d]) // DON'T include team

  return isFetching ? (
    <Loader />
  ) : (
    <div className={`${s.content} container`}>
      <h1 className={s.title}>Команда</h1>
      <SocialNetworks />
      <main>
        {team?.map((member) => (
          <Member key={member._id} member={member} />
        ))}
      </main>
    </div>
  )
}

export default OurTeamPage
