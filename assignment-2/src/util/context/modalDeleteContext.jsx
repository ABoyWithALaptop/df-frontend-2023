import { createContext } from "react";

export const ModalDeleteContext = createContext({
  deleteItem: false,
  setDeleteItem: () => { },
})