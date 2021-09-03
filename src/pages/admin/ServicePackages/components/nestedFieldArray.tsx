import React from 'react'
import { useFieldArray } from 'react-hook-form'

import { ServiceField } from './ServiceField'

import s from '../ServicePackages.module.scss'

export default ({ control }: { control: any }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `services`,
  })

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className={s.services}>
            {console.log(item)}
            <ServiceField onRemove={() => remove(k)} item={item} k={k} />
          </div>
        )
      })}

      <button
        type="button"
        onClick={() =>
          append({
            serviceName: {
              UA: 'ua',
              EN: 'en',
              RU: 'ru',
            },
            allowedIn: { first: false, second: true, third: false },
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  )
}
