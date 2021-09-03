import React, { createContext } from 'react'
import {
  DeepPartial,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormMethods,
} from 'react-hook-form'

/**
 * @param  options options passed in register
 * @param  reStyle file with custom form styles
 */

type TProps<TFields> = {
  options: any
  reStyle?: { [key: string]: string }
  children: React.ReactNode
  defaultValues?: UnpackNestedValue<DeepPartial<TFields>>
  onSubmit: SubmitHandler<TFields>
  onError?: SubmitErrorHandler<TFields>
  form?: UseFormMethods<TFields>
}

type TContext = Pick<UseFormMethods<Record<string, any>>, 'register' | 'errors' | 'getValues'> & {
  options: { [key: string]: RegisterOptions }
  reStyle?: { [key: string]: string }
  isDirty: boolean
  dirtyFields: { [key: string]: boolean }
}

export const FormContext = createContext<TContext>({} as TContext)

export const Form = <TFields,>({
  onSubmit,
  onError,
  children,
  options,
  reStyle,
  defaultValues,
  form,
}: TProps<TFields>) => {
  const {
    handleSubmit,
    register,
    getValues,
    errors,
    formState: { isDirty, dirtyFields },
  } = useForm({ defaultValues })

  return (
    <FormContext.Provider
      value={
        form
          ? ({ ...form, dirtyFields: form.formState.dirtyFields, options, reStyle } as any)
          : ({ register, errors, options, reStyle, getValues, dirtyFields, isDirty } as TContext)
      }
    >
      <form onSubmit={form ? form.handleSubmit(onSubmit, onError) : handleSubmit(onSubmit)} className={reStyle?.form}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
