import { FormEvent } from 'react'

export type TForm = {
  isFetching?: boolean
  onSubmit: (data: any) => Promise<boolean>
  handleSubmit: (onSubmit: (data: any) => void) => (event: FormEvent<HTMLFormElement>) => void
  modal?: boolean
  admin?: {
    login: string
    password: string
  }
}
