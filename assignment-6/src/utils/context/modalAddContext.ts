import { createContext } from 'react'
import { modalAddAndEditContextType } from '../types'

export const ModalAddAndEditContext = createContext<modalAddAndEditContextType>(
  {
    isModalOpen: false,
    setIsModalOpen: () => {},
    editItem: undefined,
    setEditItem: () => {},
  },
)
