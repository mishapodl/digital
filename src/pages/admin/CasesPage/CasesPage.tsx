import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TCasesData } from './types'
import styles from './CasesPage.module.scss'
import { CasesForm } from './components/CaseForm'
import { NEW_CASE_ID } from './constants'

import PageHeader from '../components/PageHeader'
import { selectCases } from '../../../redux/cases/slice'
import { caseCreate, caseDELETE, caseGET, casePATCH, caseUpdate } from '../../../redux/cases/thunks'
import {
  addCase,
  addServiceToCase,
  removeServiceFromCase,
  changeOrder,
  deleteCase,
  newCase,
} from '../../../redux/cases/actions'
import { TCases } from '../../../redux/cases/types'
import Loader from '../../../components/Loader'
import { AdminModal } from '../../AdminPanel'

const CasesPage = () => {
  const d = useDispatch()
  const { cases, isFetching, isNeedReFetch } = useSelector(selectCases)
  const [isAddingNewMember, setIsAddingNewCase] = useState(false)
  const [isOrderChanging, setIsOrderChanging] = useState(false)
  const modal = useContext(AdminModal)

  useEffect(() => {
    if (!cases?.length || isNeedReFetch) d(caseGET())
  }, [isNeedReFetch]) // DON'T include cases

  const onSubmit = useCallback(
    async (data: TCasesData, id?: string) => {
      const modalInput = await modal?.open()
      if (modalInput) {
        if (id && id !== NEW_CASE_ID) {
          data._id = id
          d(caseUpdate({ data, cases }))
        } else {
          setIsAddingNewCase(false)
          setIsOrderChanging(false)
          const { payload } = ((await d(caseCreate({ _data: data, cases }))) as unknown) as {
            payload: { status: number; case: TCases[number] }
          }
          if (payload?.status === 201) {
            let casesListPos = 0
            cases!.forEach((c, ind) => {
              if (c._id === NEW_CASE_ID) {
                casesListPos = ind
              }
            })
            d(casePATCH(cases!.map((c) => (c._id === NEW_CASE_ID ? payload.case._id : c._id))))
            d(addCase({ ind: casesListPos, case: payload.case }))
          }
        }
      }
    },
    [d, cases, modal]
  )

  const headerBtnHandler = useCallback(() => {
    if (isOrderChanging) {
      d(casePATCH(cases!.map((c) => c._id)))
      setIsOrderChanging(false)
    } else {
      setIsAddingNewCase(true)

      d(newCase())
    }
  }, [d, cases, isOrderChanging])

  const handleOrderChange = useCallback(
    (ind: number) => {
      return (step: number) => () => {
        if ((ind !== 0 || step > 0) && (ind !== cases!.length - 1 || step < 0)) {
          setIsOrderChanging(true)
          d(changeOrder({ step, ind }))
        }
      }
    },
    [d, cases]
  )

  const onDelete = useCallback(
    async (ind: number, id: string) => {
      const modalInput = await modal?.open('Ви впевнені, що бажаєте видалити кейс?')
      if (modalInput) {
        if (id !== NEW_CASE_ID) {
          const { payload } = ((await d(caseDELETE(id))) as unknown) as { payload: number }
          d(deleteCase(ind))
          if (payload === 200) d(deleteCase(ind))
        } else {
          d(deleteCase(ind))
          setIsAddingNewCase(false)
        }
      }
    },
    [d, modal]
  )

  const addService = (ind: number) => {
    d(addServiceToCase({ ind }))
  }
  const removeService = (indexCase: number, iService: any) => {
    d(removeServiceFromCase({ indexCase, iService }))
  }

  if (!cases) return null

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader
        name={'Кейси'}
        isDisabled={isAddingNewMember}
        btnText={!isAddingNewMember && isOrderChanging ? 'Зберегти порядок' : undefined}
        onCaseAdd={headerBtnHandler}
        isCasesPage={true}
      />
      <div className={styles.cases}>
        {cases?.map((c, ind) => (
          <div className={styles.cases} key={c._id || 'new-case'}>
            <CasesForm
              onSubmit={onSubmit}
              addService={() => addService(ind)}
              removeService={removeService}
              changeOrder={handleOrderChange(ind)}
              c={c}
              onDelete={() => onDelete(ind, c._id || ind + '')}
              isCreateForm={c._id === NEW_CASE_ID}
              indexCase={ind}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CasesPage
