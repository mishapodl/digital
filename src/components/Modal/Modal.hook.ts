import { useEffect, useState } from 'react'

export type TModal = {
  isOpen: boolean
  open: (text?: string) => void
  close: () => void
  mode?: TModalMode
  text?: string
  resolveOpen: (flag: boolean) => void
}
export type TModalMode = 'info' | 'confirm' | 'text'

let resolveOpen = null as any

let OpenPromise = new Promise((res) => {
  resolveOpen = (flag: boolean) => res(flag)
})

export const useModal = (mode: TModalMode = 'text') => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.body.addEventListener('keydown', onEscape)
    return () => {
      document.body.removeEventListener('keydown', onEscape)
    }
  }, [])

  return {
    isOpen,
    open: async (text?: string) => {
      setIsOpen(true)
      if (text) setText(text)
      return OpenPromise
    },
    close: () => {
      setIsOpen(false)
      OpenPromise = new Promise((res) => {
        resolveOpen = (flag: boolean) => res(flag)
      })
    },
    mode,
    resolveOpen,
    text,
  }
}
