import { createContext } from 'react'
import { modelDeleteContextType } from '../types'

export const ModalDeleteContext = createContext<modelDeleteContextType>({
  deleteItem: undefined,
  setDeleteItem: () => {},
})
