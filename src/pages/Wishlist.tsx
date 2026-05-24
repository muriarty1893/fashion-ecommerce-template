import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { removeWishlistProduct } from "../features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { formatCategoryName } from "../utils/formatCategoryName";
import { useLanguage } from "../i18n";

const Wishlist = () => {
  const { products } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const { language } = useLanguage();

  const moveToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("This item is sold out.");
      return;
    }

    dispatch(
      addProductToTheCart({
        ...product,
        id: `${product.id}Mblack`,
        productId: product.id,
        quantity: 1,
        size: "M",
        color: "black",
      })
    );
    dispatch(removeWishlistProduct({ id: product.id }));
    toast.success("Moved to cart.");
  };

  if (products.length === 0) {
    return (
      <main className="mx-auto grid min-h-[520px] max-w-screen-2xl place-items-center px-5 py-16">
        <div className="max-w-md text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gray-100 text-gray-950">
            <Heart className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-3xl font-semibold text-gray-950">
            Your wishlist is empty
          </h1>
          <p className="mt-3 text-gray-500">
            Save pieces while you compare collections, then move favorites to
            cart when you are ready.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded bg-gray-950 px-6 text-sm font-medium text-white transition hover:bg-secondaryBrown"
          >
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-5 py-12 max-[400px]:px-3">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-semibold text-gray-950">Wishlist</h1>
          <p className="mt-2 text-gray-500">
            {products.length} saved {products.length === 1 ? "item" : "items"}
          </p>
        </div>
        <Link to="/shop" className="text-sm font-medium text-secondaryBrown">
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="grid grid-cols-[128px_1fr] gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <Link
              to={`/product/${product.id}`}
              className="h-36 overflow-hidden rounded bg-gray-100"
            >
              <img
                src={`/assets/${product.image}`}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                {formatCategoryName(product.category, language)}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="mt-2 block truncate text-lg font-semibold text-gray-950"
              >
                {product.title}
              </Link>
              <p className="mt-2 text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} available` : "Sold out"}
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-950">
                ${(product.discountPrice || product.price).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => moveToCart(product)}
                  className="inline-flex h-9 items-center gap-2 rounded bg-gray-950 px-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                  disabled={product.stock <= 0}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Move to cart
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(removeWishlistProduct({ id: product.id }))
                  }
                  className="grid h-9 w-9 place-items-center rounded border border-gray-200 text-gray-500 transition hover:border-red-200 hover:text-red-600"
                  aria-label={`Remove ${product.title} from wishlist`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
