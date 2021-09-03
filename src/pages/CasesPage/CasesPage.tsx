import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Сase from './Сase'
import s from './CasesPage.module.scss'

import SocialNetworks from '../../components/SocialNetworks'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { selectCases } from '../../redux/cases/slice'
import { caseGET } from '../../redux/cases/thunks'
import Loader from '../../components/Loader'

const CasesPage: FC = () => {
  const d = useDispatch()

  const { cases, isFetching } = useSelector(selectCases)

  useEffect(() => {
    if (!cases) d(caseGET())
  })
  return isFetching ? (
    <Loader />
  ) : (
    <div className="container">
      <SocialNetworks />
      <PageTitle name={'cases'} />
      <section className={s.wrapper}>
        {cases?.map((c) => (
          <Сase c={c} key={c._id} />
        ))}
      </section>
    </div>
  )
}

export default CasesPage
