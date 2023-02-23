import { ItensType } from "../../pages/Home/types"

export type OrderStoreType = {
  itemOrder: ItensType | null
  setItemOrder: (item: ItensType) => void
}