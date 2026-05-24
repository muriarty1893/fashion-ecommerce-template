import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group w-[400px] max-md:w-[300px]"
    >
      <div className="relative h-[430px] w-full overflow-hidden rounded-lg bg-gray-100 max-md:h-[340px]">
        <Link to={`/product/${id}`} className="block h-full w-full">
          <img
            src={`/assets/${image}`}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-20 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-white/75">
              {formatCategoryName(category, language)}
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">{title}</h2>
          </div>
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] shadow-sm ${
              stock <= 0
                ? "bg-gray-950 text-white"
                : discountPrice
                  ? "bg-red-600 text-white"
                  : "bg-white/90 text-gray-950"
            }`}
          >
            {stock <= 0 ? "Sold out" : discountPrice ? "Sale" : "Drop"}
          </span>
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`grid h-10 w-10 place-items-center rounded-full shadow-sm transition ${
              isWishlisted
                ? "bg-secondaryBrown text-white"
                : "bg-white text-gray-950 hover:bg-gray-950 hover:text-white"
            }`}
            aria-label={`${isWishlisted ? "Remove" : "Save"} ${title}`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-950 text-white shadow-sm transition group-hover:bg-secondaryBrown">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{stock > 0 ? `${stock} available` : "Sold out"}</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-950">
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
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gray-950 px-4 text-sm font-medium text-white transition hover:bg-secondaryBrown"
        >
          <ShoppingBag size={16} />
          {t("viewProduct")}
        </Link>
      </div>
    </motion.div>
  );
};
export default ProductItem;
