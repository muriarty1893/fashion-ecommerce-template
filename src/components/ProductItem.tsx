import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { Heart, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleWishlistProduct } from "../features/wishlist/wishlistSlice";
import { addProductToTheCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  discountPrice,
  popularity: _popularity,
  stock,
  rating,
  colors,
  sizes,
  createdAt,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  discountPrice?: number;
  popularity: number;
  stock: number;
  rating?: number;
  colors?: string[];
  sizes?: string[];
  createdAt?: string;
}) => {
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.some((product) => product.id === id);
  const activePrice = discountPrice || price;
  const isSoldOut = stock <= 0;
  const handleWishlistToggle = () => {
    dispatch(
      toggleWishlistProduct({
        id,
        image,
        title,
        category,
        price,
        discountPrice,
        popularity: _popularity,
        stock,
        rating,
        colors,
        sizes,
        createdAt,
      })
    );
  };
  const handleAddToCart = () => {
    if (isSoldOut) {
      toast.error("This item is sold out.");
      return;
    }

    const safeSize = sizes?.[0] || "M";
    const safeColor = colors?.[0] || "black";
    dispatch(
      addProductToTheCart({
        id: `${id}${safeSize}${safeColor}`,
        productId: id,
        image,
        title,
        category,
        price: activePrice,
        quantity: 1,
        size: safeSize,
        color: safeColor,
        popularity: _popularity,
        stock,
        rating,
        colors,
        sizes,
        createdAt,
      })
    );
    toast.success(t("addedCart"));
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group w-[31.8%] min-w-[290px] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_18px_45px_rgba(28,25,23,0.06)] max-lg:w-[48%] max-sm:w-full"
    >
      <div className="relative h-[500px] w-full overflow-hidden bg-stone-100 max-xl:h-[430px] max-md:h-[380px]">
        <Link to={`/product/${id}`} className="block h-full w-full">
          <img
            src={`/assets/${image}`}
            alt={title}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] shadow-sm ${
              isSoldOut
                ? "bg-stone-950 text-white"
                : discountPrice
                  ? "bg-[#9b2f25] text-white"
                  : "bg-white text-stone-950"
            }`}
          >
            {isSoldOut ? "Sold out" : discountPrice ? "Sale" : "New"}
          </span>
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`grid h-10 w-10 place-items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 ${
              isWishlisted
                ? "bg-stone-950 text-white"
                : "bg-white text-stone-950 hover:bg-stone-950 hover:text-white"
            }`}
            aria-label={`${isWishlisted ? "Remove" : "Save"} ${title}`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6b43]">
            {formatCategoryName(category, language)}
          </p>
          <Link
            to={`/product/${id}`}
            className="mt-2 block truncate font-serif text-2xl font-semibold text-stone-950 transition hover:text-[#9b6b43]"
          >
            {title}
          </Link>
          <p className="mt-2 text-sm text-stone-500">
            {stock > 0
              ? stock <= 12
                ? `Only ${stock} left`
                : "In stock"
              : "Sold out"}
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-2">
            <p className="text-xl font-black text-stone-950">
              ${activePrice.toLocaleString()}
            </p>
            {discountPrice && (
              <p className="text-sm text-stone-400 line-through">
                ${price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-stone-950 px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
          >
            <ShoppingBag size={16} />
            {t("addToCart")}
          </button>
          <Link
            to={`/product/${id}`}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-stone-300 px-4 text-xs font-bold uppercase tracking-wide text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
          >
            {t("viewProduct")}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductItem;
