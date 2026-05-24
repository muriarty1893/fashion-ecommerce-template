import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
  products: Product[];
};

const initialState: WishlistState = {
  products: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistProduct: (state, action: PayloadAction<Product>) => {
      const exists = state.products.some(
        (product) => product.id === action.payload.id
      );

      state.products = exists
        ? state.products.filter((product) => product.id !== action.payload.id)
        : [action.payload, ...state.products];
    },
    removeWishlistProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { toggleWishlistProduct, removeWishlistProduct } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
