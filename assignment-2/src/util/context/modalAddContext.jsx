import { createContext } from "react";

export const ModalAddContext = createContext({
  isModalAddOpen: false,
  setIsModalAddOpen: () => { },
})