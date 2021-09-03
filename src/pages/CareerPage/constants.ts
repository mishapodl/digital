import { letters } from '../../components/FeedBack/regex'
import { getPhone } from '../../helpers'

export enum Fields {
  name = 'name',
  phone = 'phone',
  files = 'files',
}

const requiredExtensions = ['doc', 'docx', 'pdf']

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
  [Fields.files]: {
    required: { value: true, message: `form.error.${Fields.files}.size` },
    validate: {
      extension: (files: FileList): true | string => {
        return requiredExtensions.includes(files[0].name.split('.')[1]) || `form.error.${Fields.files}.extension`
      },
      size: (files: FileList): true | string => {
        // ? less than 5MB
        return files[0].size / 1024 ** 2 < 5 || `form.error.${Fields.files}.size`
      },
    },
  },
}
