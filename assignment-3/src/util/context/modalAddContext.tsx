import { createContext } from 'react'
import { modalAddContextType } from '../type'

export const ModalAddContext = createContext<modalAddContextType>({
  isModalAddOpen: false,
  setIsModalAddOpen: () => {},
})
