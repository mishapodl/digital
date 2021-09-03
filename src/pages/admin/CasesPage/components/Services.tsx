import React, { FC } from 'react'
import { useMediaQuery } from 'react-responsive'

import { TextArea, Input } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { LangCode } from '../../../../helpers'

type TProps = {
  lang: LangCode
  serviceField: string
  services: string
  prefixes?: string[]
  servicesProvides: any
  removeService: (indexCase: number, iService: number) => void
  indexCase: number
}

const Services: FC<TProps> = ({
  lang,
  services,
  serviceField,
  prefixes,
  servicesProvides,
  removeService,
  indexCase,
}) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  let n = 1

  return (
    <>
      <div>
        {servicesProvides.services?.map((_: any, i: number) => {
          return (
            <div key={`${lang}.${serviceField}.${i}`}>
              {_ &&
                (isMobile ? (
                  <TextArea
                    name={`${lang}.${serviceField}.${i}`}
                    title={`${services} ${_ && n++}`}
                    prefixes={prefixes}
                    service={`${lang}.${serviceField}.${i}`}
                  />
                ) : (
                  <Input
                    name={`${lang}.${serviceField}.${i}`}
                    title={`${services} ${_ && n++}`}
                    prefixes={prefixes}
                    service={`${lang}.${serviceField}.${i}`}
                  />
                ))}
              {lang === 'EN' && _ && (
                <span>
                  <ControlBtn mode={MODE.Remove} onClick={() => removeService(indexCase, i)} text="x" />
                </span>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Services
