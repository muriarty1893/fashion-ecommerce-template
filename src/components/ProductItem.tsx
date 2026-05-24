import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { Heart, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleWishlistProduct } from "../features/wishlist/wishlistSlice";

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

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group w-[31.8%] min-w-[290px] max-lg:w-[48%] max-sm:w-full"
    >
      <div className="relative h-[520px] w-full overflow-hidden bg-gray-100 max-xl:h-[430px] max-md:h-[380px]">
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
              stock <= 0
                ? "bg-black text-white"
                : discountPrice
                  ? "bg-red-600 text-white"
                  : "bg-white text-black"
            }`}
          >
            {stock <= 0 ? "Tükendi" : discountPrice ? "İndirim" : "Yeni"}
          </span>
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`grid h-10 w-10 place-items-center rounded-full transition ${
              isWishlisted
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
            aria-label={`${isWishlisted ? "Remove" : "Save"} ${title}`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            {formatCategoryName(category, language)}
          </p>
          <Link
            to={`/product/${id}`}
            className="mt-1 block truncate text-base font-semibold text-black transition hover:text-gray-500"
          >
            {title}
          </Link>
          <p className="mt-1 text-xs text-gray-500">
            {stock > 0 ? `${stock} adet stokta` : "Tükendi"}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <p className="text-lg font-black text-black">
              ${activePrice.toLocaleString()}
            </p>
            {discountPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <Link
          to={`/product/${id}`}
          className="inline-flex h-10 shrink-0 items-center gap-2 bg-black px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-gray-800"
        >
          <ShoppingBag size={16} />
          {t("viewProduct")}
        </Link>
      </div>
    </motion.div>
  );
};
export default ProductItem;
