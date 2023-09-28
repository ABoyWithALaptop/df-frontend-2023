import { createContext } from 'react'
import { modelDeleteContextType } from '../type'

export const ModalDeleteContext = createContext<modelDeleteContextType>({
  deleteItem: undefined,
  setDeleteItem: () => {},
})
