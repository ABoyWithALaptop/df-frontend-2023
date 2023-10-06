import { createContext } from 'react'
import { modalAddContextType } from '../types'

export const ModalAddContext = createContext<modalAddContextType>({
  isModalAddOpen: false,
  setIsModalAddOpen: () => {},
})
