export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  ingredients?: string[];
  image: string;
  rating?: number;
  count: number;
}
