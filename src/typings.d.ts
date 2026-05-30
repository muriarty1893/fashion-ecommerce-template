interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  discountPrice?: number;
  popularity: number;
  stock: number;
  rating?: number;
  colors?: string[];
  sizes?: string[];
  createdAt?: string;
}

interface ProductInCart extends Product {
  id: string;
  productId?: string;
  quantity: number;
  size: string;
  color: string;
  stock: number;
}

interface ShopFilters {
  minPrice: string;
  maxPrice: string;
  color: string;
  size: string;
  availability: string;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

interface Order {
  id: number;
  orderStatus: string;
  orderDate: string;
  data: {
    email: string;
    emailAddress?: string;
    [key: string]: unknown;
  };
  products: ProductInCart[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  user: {
    email: string;
    id: number | string;
  };
}
