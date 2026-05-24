import ProductItem from "./ProductItem";
import { SearchX } from "lucide-react";

const ProductGrid = ({ products }: { products?: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <div
        id="gridTop"
        className="mx-auto mt-12 grid min-h-[320px] max-w-screen-2xl place-items-center px-5 text-center max-[400px]:px-3"
      >
        <div className="max-w-md">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gray-100 text-gray-950">
            <SearchX className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold text-gray-950">
            No products found
          </h2>
          <p className="mt-2 text-gray-500">
            Try changing the filters or search terms to see more pieces.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="gridTop"
      className="mx-auto mt-8 flex max-w-screen-2xl flex-wrap items-start justify-between gap-x-5 gap-y-10 px-3 max-xl:justify-start"
    >
      {products &&
        products.map((product: Product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            discountPrice={product.discountPrice}
            popularity={product.popularity}
            stock={product.stock}
            rating={product.rating}
            colors={product.colors}
            sizes={product.sizes}
            createdAt={product.createdAt}
          />
        ))}
    </div>
  );
};
export default ProductGrid;
