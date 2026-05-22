import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  popularity: _popularity,
  stock,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}) => {
  const { language, t } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group w-[400px] max-md:w-[300px]"
    >
      <Link
        to={`/product/${id}`}
        className="relative block h-[430px] w-full overflow-hidden rounded-lg bg-gray-100 max-md:h-[340px]"
      >
        <img
          src={`/assets/${image}`}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-gray-950 shadow-sm">
            Drop
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-950 text-white shadow-sm transition group-hover:bg-secondaryBrown">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-20 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/75">
            {formatCategoryName(category, language)}
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">{title}</h2>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{stock > 0 ? `${stock} available` : "Sold out"}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-950">${price.toLocaleString()}</p>
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
