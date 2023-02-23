import { create } from 'zustand'
import { OrderStoreType } from './type'

export const useOrderStore = create<OrderStoreType>(set => ({
  itemOrder: null,
  setItemOrder(item) {
    console.log(item)
    set({ itemOrder: item })
  },
}))