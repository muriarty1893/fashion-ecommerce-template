import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

const fallbackProducts: Product[] = [];
const fallbackColors = ["black", "ivory", "cocoa", "sage"];
const fallbackSizes = ["XS", "S", "M", "L", "XL"];

const enrichProduct = (product: Product, index: number): Product => ({
  ...product,
  discountPrice:
    product.discountPrice ||
    (index % 5 === 0 ? Math.round(product.price * 0.85) : undefined),
  rating: product.rating || Math.max(3, Math.min(5, 5 - (index % 3) * 0.3)),
  colors: product.colors || fallbackColors.slice(0, 2 + (index % 3)),
  sizes: product.sizes || fallbackSizes.slice(index % 2, 4 + (index % 2)),
  createdAt:
    product.createdAt ||
    new Date(Date.now() - index * 86400000).toISOString().slice(0, 10),
});

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  filters,
  category,
  page,
  limit,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  filters?: ShopFilters;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  // Memoize the function to prevent unnecessary re-renders
  // getSearchedProducts will be called only when searchQuery or sortCriteria changes
  const getSearchedProducts = useCallback(
    async (query: string, sort: string, page: number) => {
      if (!query || query.length === 0) {
        query = "";
      }
      let allProducts = fallbackProducts.map(enrichProduct);

      try {
        const response = await customFetch("/products");
        if (response.data?.length) {
          allProducts = (response.data as Product[]).map(enrichProduct);
        }
      } catch {
        allProducts = fallbackProducts;
      }

      let searchedProducts = allProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      if (category) {
        searchedProducts = searchedProducts.filter((product: Product) => {
          return product.category === category;
        });
      }

      if (filters?.minPrice) {
        searchedProducts = searchedProducts.filter(
          (product: Product) =>
            (product.discountPrice || product.price) >= Number(filters.minPrice)
        );
      }

      if (filters?.maxPrice) {
        searchedProducts = searchedProducts.filter(
          (product: Product) =>
            (product.discountPrice || product.price) <= Number(filters.maxPrice)
        );
      }

      if (filters?.color) {
        searchedProducts = searchedProducts.filter((product: Product) =>
          (product.colors || fallbackColors).includes(filters.color)
        );
      }

      if (filters?.size) {
        searchedProducts = searchedProducts.filter((product: Product) =>
          (product.sizes || fallbackSizes).includes(filters.size)
        );
      }

      if (filters?.availability === "in-stock") {
        searchedProducts = searchedProducts.filter(
          (product: Product) => product.stock > 0
        );
      } else if (filters?.availability === "sold-out") {
        searchedProducts = searchedProducts.filter(
          (product: Product) => product.stock <= 0
        );
      }

      if (totalProducts !== searchedProducts.length) {
        dispatch(setTotalProducts(searchedProducts.length));
      }

      // Sort the products based on the sortCriteria
      if (sort === "price-asc") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => a.price - b.price
        );
      } else if (sort === "price-desc") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => b.price - a.price
        );
      } else if (sort === "popularity") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => b.popularity - a.popularity
        );
      } else if (sort === "best-rated") {
        searchedProducts = searchedProducts.sort(
          (a: Product, b: Product) => (b.rating || 0) - (a.rating || 0)
        );
      } else if (sort === "newest") {
        searchedProducts = searchedProducts.sort((a: Product, b: Product) =>
          (b.createdAt || "").localeCompare(a.createdAt || "")
        );
      }
      // Limit the number of products to be displayed
      if (limit) {
        setProducts(searchedProducts.slice(0, limit));
        // Set the number of products being displayed
        // This will be displayed in the ShowingPagination component
        dispatch(setShowingProducts(searchedProducts.slice(0, limit).length));
        // If page is provided, slice the products based on the page number
        // this will be used for pagination
      } else if (page) {
        setProducts(searchedProducts.slice(0, page * 9));
        // Set the number of products being displayed
        // This will be displayed in the ShowingPagination component
        dispatch(
          setShowingProducts(searchedProducts.slice(0, page * 9).length)
        );
        // If no limit or page is provided, display all the products
      } else {
        setProducts(searchedProducts);
        // Set the number of products being displayed
        dispatch(setShowingProducts(searchedProducts.length));
      }
    },
    [category, dispatch, filters, limit, totalProducts]
  );

  useEffect(() => {
    getSearchedProducts(searchQuery || "", sortCriteria || "", page || 1);
  }, [getSearchedProducts, searchQuery, sortCriteria, page]);

  // Clone the children and pass the products as props to the children
  // This will cause the children to re-render with the new products
  // Also it will cause many re-renders if the children are not memoized
  // So I memoized the ProductGrid component
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products: products });
    }
    return null;
  });

  return childrenWithProps;
};
export default ProductGridWrapper;
