import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { toggleWishlistProduct } from "../features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useLanguage } from "../i18n";
import { formatCategoryName } from "../utils/formatCategoryName";
import { productImageSrc } from "../utils/productImageSrc";

const HomeBestSellerGrid = ({ products }: { products?: Product[] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="mx-auto mt-10 hidden max-w-screen-2xl px-5 md:block md:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
          <p className="font-serif text-3xl font-semibold text-stone-950">
            No products found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 hidden max-w-screen-2xl flex-wrap items-stretch justify-between gap-y-8 px-5 md:flex md:px-8 max-xl:justify-start max-xl:gap-5">
      {products.map((product) => (
        <HomeBestSellerCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const HomeBestSellerCard = ({ product }: { product: Product }) => {
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector((state) => state.wishlist.products);
  const isWishlisted = wishlistProducts.some((item) => item.id === product.id);
  const activePrice = product.discountPrice || product.price;
  const isSoldOut = product.stock <= 0;
  const safeSize = product.sizes?.[0] || "M";
  const safeColor = product.colors?.[0] || "black";

  const handleWishlistToggle = () => {
    dispatch(toggleWishlistProduct(product));
  };

  const handleAddToCart = () => {
    if (isSoldOut) {
      toast.error("This item is sold out.");
      return;
    }

    dispatch(
      addProductToTheCart({
        ...product,
        id: `${product.id}${safeSize}${safeColor}`,
        productId: product.id,
        price: activePrice,
        quantity: 1,
        size: safeSize,
        color: safeColor,
      })
    );
    toast.success(t("addedCart"));
  };

  return (
    <article className="best-seller-card">
      <div className="best-seller-card-content">
        <div className="best-seller-card-front">
          <img
            src={productImageSrc(product.image)}
            alt={product.title}
            className="best-seller-card-image"
          />
          <div className="best-seller-card-front-content">
            <div className="best-seller-card-description">
              <p className="best-seller-card-title">
                <strong>{product.title}</strong>
              </p>
              <p className="best-seller-card-footer">
                ${activePrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="best-seller-card-back">
          <img
            src={productImageSrc(product.image)}
            alt=""
            className="best-seller-card-back-image"
            aria-hidden="true"
          />
          <div className="best-seller-card-back-content">
            <span className="best-seller-card-back-kicker">
              {formatCategoryName(product.category, language)}
            </span>
            <h3>{product.title}</h3>
            <p>
              {isSoldOut
                ? "Sold out"
                : product.stock <= 12
                  ? `Only ${product.stock} left`
                  : "In stock"}
            </p>
            <div className="best-seller-card-price">
              ${activePrice.toLocaleString()}
              {product.discountPrice && (
                <span>${product.price.toLocaleString()}</span>
              )}
            </div>
            <p className="best-seller-card-meta">
              Size {safeSize} &nbsp; | &nbsp; Color {safeColor}
            </p>
            <div className="best-seller-card-actions">
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="best-seller-card-star-button"
                aria-label={`${isWishlisted ? "Remove" : "Save"} ${product.title}`}
              >
                {isWishlisted ? "Liked" : "Like"}
                {[1, 2, 3, 4, 5, 6].map((star) => (
                  <span
                    key={star}
                    className={`best-seller-star best-seller-star-${star}`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74C576.12 378.4 412.95 210.09 392.05 0z" />
                    </svg>
                  </span>
                ))}
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className="best-seller-card-cart-button"
              >
                <span className="best-seller-cart-icon">
                  <ShoppingBag size={17} />
                </span>
                <span className="best-seller-cart-text">Add to Cart</span>
              </button>
              <Link
                href={`/product/${product.id}`}
                className="best-seller-card-view-button"
              >
                View Page
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HomeBestSellerGrid;
