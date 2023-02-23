export interface CategoryType {
  id: number;
  name: string;
}

export interface ItensType {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  stock: number;
  description: string;
  category: CategoryType;
}