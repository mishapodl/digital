import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TRequestsFields } from './types'
import { LinkForm } from './components/LinkForm'
import { Request } from './components/Request'

import PageHeader from '../components/PageHeader'
import {
  getConsultations,
  getConsultationLinks,
  postConsultationLinks,
} from '../../../redux/consultationRequest/thunks'
import { consultationsList, getLinks, getIsFetching } from '../../../redux/consultationRequest/selectors'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'

const ConsultationRequestsPage: FC = () => {
  const dispatch = useDispatch()
  const requests = useSelector(consultationsList)
  const links = useSelector(getLinks)
  const isFetching = useSelector(getIsFetching)
  const adminModal = useContext(AdminModal)

  useEffect(() => {
    dispatch(getConsultationLinks())
    dispatch(getConsultations())
  }, [])

  const onSubmit = async (data: TRequestsFields) => {
    const choice = await adminModal?.open()
    if (choice) dispatch(postConsultationLinks(data))
  }

  if (!requests) return null
  if (!links) return null

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Консультація'} />
      <LinkForm onSubmit={onSubmit} links={links} />
      {requests.map(({ name, phone, email, _id, receivedIn }) => (
        <Request key={_id} name={name} phone={phone} email={email} receivedIn={receivedIn} />
      ))}
    </>
  )
}

export default ConsultationRequestsPage
