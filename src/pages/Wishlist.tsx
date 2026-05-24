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
      <main className="grid min-h-[620px] place-items-center bg-[#fbfaf8] px-5 py-16">
        <div className="max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-[0_24px_80px_rgba(28,25,23,0.07)]">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
            <Heart className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-stone-950">
            Your wishlist is empty
          </h1>
          <p className="mt-3 leading-7 text-stone-600">
            Save pieces while you compare collections, then move favorites to
            cart when you are ready.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-stone-950 px-7 text-sm font-bold text-white transition hover:bg-[#9b6b43]"
          >
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            Saved edit
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-5xl font-semibold text-stone-950 max-sm:text-4xl">
                Wishlist
              </h1>
              <p className="mt-3 text-stone-600">
                {products.length} saved {products.length === 1 ? "item" : "items"}
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex w-fit rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="grid gap-4 overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-[0_18px_45px_rgba(28,25,23,0.05)] sm:grid-cols-[150px_1fr]"
            >
              <Link
                to={`/product/${product.id}`}
                className="h-56 overflow-hidden rounded-2xl bg-stone-100 sm:h-full"
              >
                <img
                  src={`/assets/${product.image}`}
                  alt={product.title}
                  className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.03]"
                />
              </Link>
              <div className="min-w-0 py-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b6b43]">
                  {formatCategoryName(product.category, language)}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-2 block truncate font-serif text-2xl font-semibold text-stone-950 transition hover:text-[#9b6b43]"
                >
                  {product.title}
                </Link>
                <p className="mt-2 text-sm font-semibold text-stone-500">
                  {product.stock > 0 ? `${product.stock} available` : "Sold out"}
                </p>
                <p className="mt-3 text-xl font-black text-stone-950">
                  ${(product.discountPrice || product.price).toLocaleString()}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveToCart(product)}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 text-stone-500 transition hover:border-red-200 hover:text-red-600"
                    aria-label={`Remove ${product.title} from wishlist`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
