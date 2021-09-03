import { email, letters } from '../../components/FeedBack/regex'
import { getPhone } from '../../helpers'

export enum Fields {
  name = 'name',
  phone = 'phone',
  email = 'email',
}

export const options = {
  [Fields.name]: {
    required: { value: true, message: `form.error.${Fields.name}.empty` },
    maxLength: { value: 50, message: `form.error.${Fields.name}.empty` },
    pattern: { value: letters, message: `form.error.${Fields.name}.empty` },
  },
  [Fields.phone]: {
    required: { value: true, message: `form.error.${Fields.phone}.empty` },
    minLength: { value: 9, message: `form.error.${Fields.phone}.empty` },
    validate: {
      pattern: (val: string) => {
        const phoneNumber = getPhone(val)
        if (phoneNumber === null) return `form.error.${Fields.phone}.empty`

        return true
      },
    },
  },
  [Fields.email]: {
    pattern: { value: email, message: `form.error.${Fields.email}.empty` },
  },
}
