import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TRequestsFields } from './types'
import { LinkForm } from './components/LinkForm'
import { Request } from './components/Request'

import PageHeader from '../components/PageHeader'
import { getCV, getCVLinks, postCVLinks } from '../../../redux/cvRequest/thunks'
import { cvList, getLinks, getIsFetching } from '../../../redux/cvRequest/selectors'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'

const CVRequestsPage: FC = () => {
  const dispatch = useDispatch()
  const requests = useSelector(cvList)
  const links = useSelector(getLinks)
  const isFetching = useSelector(getIsFetching)
  const adminModal = useContext(AdminModal)

  useEffect(() => {
    dispatch(getCVLinks())
    dispatch(getCV())
  }, [])

  const onSubmit = async (data: TRequestsFields) => {
    const choice = await adminModal?.open()
    if (choice) dispatch(postCVLinks(data))
  }

  if (!requests) return null
  if (!links) return null

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Резюме'} />
      <LinkForm onSubmit={onSubmit} links={links} />
      {requests.map(({ name, phone, cv, _id, receivedIn }) => (
        <Request key={_id} name={name} phone={phone} cv={cv} receivedIn={receivedIn} isCVPage={true} />
      ))}
    </>
  )
}

export default CVRequestsPage
