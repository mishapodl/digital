/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TOurTeamData } from './types'
import styles from './OurTeamPage.module.scss'
import { MemberForm } from './components/MemberForm'
import { NEW_MEMBER_ID } from './constants'

import PageHeader from '../components/PageHeader'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { teamCreate, teamDELETE, teamGET, teamPATCH, teamUpdate } from '../../../redux/ourTeam/thunks'
import { addMember, changeOrder, deleteMember, deleteNewMember, newMember } from '../../../redux/ourTeam/actions'
import type { TTeam } from '../../../redux/ourTeam/types'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'
import { selectOurTeam } from '../../../redux/ourTeam/selectors'

const OurTeamPage = () => {
  const d = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { team, isFetching } = useSelector(selectOurTeam)
  const [isAddingNewMember, setIsAddingNewMember] = useState(false)
  const [isOrderChanging, setIsOrderChanging] = useState(false)
  const modal = useContext(AdminModal)

  useEffect(() => {
    if (!team.length) {
      d(teamGET())
    }
    return () => {
      d(deleteNewMember())
    }
  }, []) // DON'T include team

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (data: TOurTeamData, id?: string) => {
      const modalInput = await modal?.open()
      if (modalInput) {
        if (id && id !== NEW_MEMBER_ID) {
          data._id = id
          // @ts-ignore
          if (!data[data._id].picture.length) data.picture = team.filter((member) => member._id === data._id)[0].img
          d(teamUpdate({ _data: data, team }))
        } else {
          setIsAddingNewMember(false)
          setIsOrderChanging(false)
          await d(teamCreate({ _data: data, team }))
        }
      }
    },
    [d, team]
  )

  const headerBtnHandler = useCallback(() => {
    if (isOrderChanging) {
      d(teamPATCH(team!.map((member: any) => member._id)))
      setIsOrderChanging(false)
    } else {
      setIsAddingNewMember(true)

      d(newMember())
    }
  }, [team, isOrderChanging])

  const onDelete = useCallback(
    async (id: string) => {
      const modalInput = await modal?.open('Ви впевнені, що бажаєте видалити співробітника?')
      if (modalInput) {
        if (id !== NEW_MEMBER_ID) {
          const { payload } = ((await d(teamDELETE(id))) as unknown) as { payload: number }
          if (payload === 200) d(deleteMember(id))
        } else {
          d(deleteMember(id))
          setIsAddingNewMember(false)
        }
      }
    },
    [d]
  )

  const handleOrderChange = useCallback(
    (ind: number) => {
      return (step: number) => () => {
        if ((ind !== 0 || step > 0) && (ind !== team!.length - 1 || step < 0)) {
          setIsOrderChanging(true)
          d(changeOrder({ step, ind }))
        }
      }
    },
    [d, team]
  )

  return isFetching ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <PageHeader
        name={'Команда'}
        isDisabled={isAddingNewMember}
        btnText={!isAddingNewMember && isOrderChanging ? 'Зберегти порядок' : undefined}
        onClick={headerBtnHandler}
        isOurTeamPage={true}
      />
      <div className={styles.team}>
        {team.map((member: any, ind) => (
          <div className={styles.member} key={member._id || 'new-member'}>
            <MemberForm
              onSubmit={onSubmit}
              changeOrder={handleOrderChange(ind)}
              member={member}
              onDelete={() => onDelete(member._id)}
              isCreateForm={member._id === NEW_MEMBER_ID}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default OurTeamPage
