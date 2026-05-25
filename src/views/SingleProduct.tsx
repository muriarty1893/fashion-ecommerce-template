import {
  Button,
  Dropdown,
  ProductItem,
} from "../components";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { toggleWishlistProduct } from "../features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";
import { useLanguage } from "../i18n";
import db from "../data/db.json";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";

type ProductDetail = {
  subtitle: string;
  story: string;
  details: string[];
  fit: string;
  materials: string;
  delivery: string;
};

const fallbackProducts = db.products as Product[];
const fallbackColors = ["black", "ivory", "cocoa", "sage"];
const fallbackSizes = ["XS", "S", "M", "L", "XL"];

const productDetails: Record<string, ProductDetail> = {
  "special-edition": {
    subtitle: "Limited wardrobe piece with a clean occasion-ready profile.",
    story:
      "Made for evenings, showroom appointments, and dressed-up weekends, this piece balances a polished silhouette with comfortable movement.",
    details: [
      "Lightly structured shape with a soft inner finish",
      "Concealed fastening for a clean front",
      "Designed to layer under long coats or cropped jackets",
    ],
    fit: "True to size. Choose one size up for a relaxed drape.",
    materials: "62% viscose, 32% recycled polyester, 6% elastane.",
    delivery: "Ships in 1-3 business days with tracked delivery and easy returns.",
  },
  "luxury-collection": {
    subtitle: "Elevated everyday styling with premium texture and weight.",
    story:
      "A refined staple built around texture, proportion, and wearability. It works as a statement piece without making the rest of the outfit difficult.",
    details: [
      "Premium mid-weight fabric with a smooth hand feel",
      "Tailored seams for a sharper shoulder and waist line",
      "Pairs well with tonal trousers, denim, or minimal accessories",
    ],
    fit: "Regular fit through the body with room for movement.",
    materials: "70% cotton, 24% modal, 6% elastane.",
    delivery: "Prepared within 24 hours on weekdays. Free exchanges on size issues.",
  },
  "summer-edition": {
    subtitle: "Lightweight color and breathable comfort for warm days.",
    story:
      "Cut for bright weather and long days out, this piece keeps the look crisp while staying easy to pack, style, and repeat.",
    details: [
      "Breathable fabric selected for warm-weather wear",
      "Soft lining where needed to prevent transparency",
      "Easy-care finish for travel and weekend use",
    ],
    fit: "Slightly relaxed. Size down for a closer silhouette.",
    materials: "55% linen, 45% cotton.",
    delivery: "Standard delivery arrives in 3-5 business days.",
  },
  "unique-collection": {
    subtitle: "Distinctive seasonal shape with boutique-level finishing.",
    story:
      "This item is designed as the outfit anchor: strong enough to stand alone, simple enough to style across multiple occasions.",
    details: [
      "Statement cut with restrained detailing",
      "Finished hems and seams for a premium feel",
      "Small-batch production for a more individual wardrobe",
    ],
    fit: "Tailored fit. If between sizes, choose the larger size.",
    materials: "64% rayon, 28% nylon, 8% elastane.",
    delivery: "Ships with signature packaging and return label included.",
  },
};

const colors = [
  { id: "black", label: "Black", className: "bg-gray-950" },
  { id: "ivory", label: "Ivory", className: "bg-stone-100" },
  { id: "cocoa", label: "Cocoa", className: "bg-[#7C5C45]" },
  { id: "sage", label: "Sage", className: "bg-[#8FA58A]" },
];

const SingleProduct = () => {
  const params = useParams<{ id: string }>();
  const localProduct =
    fallbackProducts.find((product) => product.id === params.id) || fallbackProducts[0];
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [singleProduct, setSingleProduct] = useState<Product>(localProduct);
  const [size, setSize] = useState<string>("M");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(localProduct.image);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wishlistProducts = useAppSelector((state) => state.wishlist.products);
  const { language, t } = useLanguage();
  const detail = productDetails[singleProduct.category] || productDetails["luxury-collection"];
  const isSoldOut = singleProduct.stock <= 0;
  const activePrice = singleProduct.discountPrice || singleProduct.price;
  const productSizes = singleProduct.sizes || fallbackSizes;
  const productColors = colors.filter((item) =>
    (singleProduct.colors || fallbackColors).includes(item.id)
  );
  const isWishlisted = wishlistProducts.some(
    (product) => product.id === singleProduct.id
  );
  const galleryImages = useMemo(
    () => [
      singleProduct.image,
      "single product image 1.jpg",
      "single product image 2.jpg",
      fallbackProducts[(Number(singleProduct.id) + 2) % fallbackProducts.length].image,
    ],
    [singleProduct.id, singleProduct.image]
  );

  useEffect(() => {
    const nextLocalProduct =
      fallbackProducts.find((product) => product.id === params.id) || fallbackProducts[0];
    setSingleProduct(nextLocalProduct);
    setSelectedImage(nextLocalProduct.image);

    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) return;
        const data = (await response.json()) as Product;
        if (data?.id) {
          setSingleProduct(data);
          setSelectedImage(data.image);
        }
      } catch {
        setSingleProduct(nextLocalProduct);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) return;
        const data = (await response.json()) as Product[];
        if (data.length) setProducts(data);
      } catch {
        setProducts(fallbackProducts);
      }
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (isSoldOut) {
      toast.error("This item is sold out.");
      return;
    }

    const safeQuantity = Math.min(quantity, singleProduct.stock);
    dispatch(
      addProductToTheCart({
        id: singleProduct.id + size + color,
        productId: singleProduct.id,
        image: singleProduct.image,
        title: singleProduct.title,
        category: singleProduct.category,
        price: activePrice,
        quantity: safeQuantity,
        size,
        color,
        popularity: singleProduct.popularity,
        stock: singleProduct.stock,
      })
    );
    toast.success(t("addedCart"));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (!isSoldOut) router.push("/checkout");
  };

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8 max-[400px]:px-3">
    <div className="mx-auto max-w-screen-2xl">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] xl:gap-16">
        <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
            {galleryImages.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-white p-1 transition ${
                  selectedImage === image ? "border-stone-950" : "border-stone-200"
                }`}
              >
                <img
                  src={`/assets/${image}`}
                  alt={singleProduct.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
            ))}
          </div>
          <div className="order-1 overflow-hidden rounded-[2rem] bg-stone-100 shadow-[0_24px_80px_rgba(28,25,23,0.08)] sm:order-2">
            <img
              src={`/assets/${selectedImage}`}
              alt={singleProduct.title}
              className="h-full min-h-[460px] w-full object-cover max-md:min-h-[340px]"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-7 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="rounded-full bg-stone-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
                {formatCategoryName(singleProduct.category, language)}
              </p>
              <div className="flex items-center gap-1 text-sm text-[#9b6b43]">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}
                <span className="ml-2 text-stone-500">128 reviews</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-4xl font-semibold leading-tight text-stone-950 md:text-5xl">
                {singleProduct.title}
              </h1>
              <p className="mt-3 text-base leading-7 text-stone-600">{detail.subtitle}</p>
            </div>
            <div className="flex items-end justify-between gap-4 border-y border-stone-200 py-5">
              <div>
                <p className="text-4xl font-semibold text-stone-950">
                  ${activePrice.toLocaleString()}
                </p>
                {singleProduct.discountPrice && (
                  <p className="mt-1 text-lg text-stone-400 line-through">
                    ${singleProduct.price.toLocaleString()}
                  </p>
                )}
              </div>
              <p className="text-sm font-bold text-[#9b6b43]">
                {singleProduct.stock > 0 ? `${singleProduct.stock} in stock` : "Out of stock"}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-stone-950">Size</p>
                <p className="text-sm text-stone-500">Model wears M</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productSizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`h-11 rounded-full border text-sm font-bold transition ${
                      size === item
                        ? "border-stone-950 bg-stone-950 text-white"
                        : "border-stone-200 bg-white text-stone-800 hover:border-stone-950"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-stone-950">Color</p>
              <div className="flex flex-wrap gap-3">
                {productColors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColor(item.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      color === item.id ? "border-stone-950" : "border-stone-200"
                    }`}
                  >
                    <span className={`h-5 w-5 rounded-full border border-black/10 ${item.className}`} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-stone-950">Quantity</p>
              <div className="inline-flex h-11 overflow-hidden rounded-full border border-stone-200 bg-[#fbfaf8]">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="w-11 text-xl text-stone-700 transition hover:bg-stone-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={singleProduct.stock || 1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      Math.min(
                        singleProduct.stock || 1,
                        Math.max(1, Number(event.target.value) || 1)
                      )
                    )
                  }
                  className="h-full w-16 border-x border-stone-200 bg-white text-center text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.min(singleProduct.stock, value + 1))
                  }
                  disabled={isSoldOut || quantity >= singleProduct.stock}
                  className="w-11 text-xl text-stone-700 transition hover:bg-stone-100 disabled:text-stone-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <Button mode="brown" text={isSoldOut ? "Sold out" : t("addToCart")} onClick={handleAddToCart} />
              <Button mode="white" text="Buy now" onClick={handleBuyNow} />
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    toggleWishlistProduct({
                      ...singleProduct,
                      discountPrice: singleProduct.discountPrice,
                      sizes: productSizes,
                      colors: productColors.map((item) => item.id),
                    })
                  )
                }
                className={`grid h-12 w-12 place-items-center rounded-full border transition ${
                  isWishlisted
                    ? "border-[#9b6b43] bg-[#9b6b43] text-white"
                    : "border-stone-200 text-stone-950 hover:border-stone-950"
                }`}
                aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist`}
              >
                <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="text-right text-sm font-semibold text-[#9b6b43]">
              {t("deliveryEstimate")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Free returns", "Secure checkout", "Gift packaging"].map((item) => (
              <div key={item} className="rounded-2xl bg-[#fbfaf8] p-3 text-center text-sm font-semibold text-stone-600">
                {item}
              </div>
            ))}
          </div>

          <div>
            <Dropdown dropdownTitle={t("description")}>
              {detail.story}
            </Dropdown>

            <Dropdown dropdownTitle={t("productDetails")}>
              {`${detail.details.join(" ")} ${detail.fit} ${detail.materials}`}
            </Dropdown>

            <Dropdown dropdownTitle={t("deliveryDetails")}>
              {detail.delivery}
            </Dropdown>

            <Dropdown dropdownTitle="Size guide">
              XS: 32-34, S: 36, M: 38, L: 40, XL: 42. If between sizes,
              choose based on preferred fit: smaller for a sharp silhouette,
              larger for easier drape.
            </Dropdown>
          </div>
        </div>
      </div>

      <section className="mt-20 grid gap-5 lg:grid-cols-3">
        {[
          {
            name: "Mina Aydin",
            text: "The fabric feels substantial and the fit notes matched what arrived.",
          },
          {
            name: "Elif Kaya",
            text: "The gallery made it easy to compare texture before ordering.",
          },
          {
            name: "Sara Demir",
            text: "Premium presentation, simple checkout, and quick delivery updates.",
          },
        ].map((review) => (
          <article key={review.name} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
            <div className="mb-3 flex text-[#9b6b43]">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <p className="text-stone-600">"{review.text}"</p>
            <p className="mt-4 font-semibold text-stone-950">{review.name}</p>
          </article>
        ))}
      </section>

      <div>
        <h2 className="mb-12 mt-24 text-center font-serif text-5xl font-semibold text-stone-950 max-lg:text-4xl">
          {t("similarProducts")}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-y-8 max-xl:justify-start max-xl:gap-5">
          {products
            .filter((product) => product.id !== singleProduct.id)
            .slice(0, 3)
            .map((product: Product) => (
            <ProductItem
              key={product?.id}
              id={product?.id}
              image={product?.image}
              title={product?.title}
              category={product?.category}
              price={product?.price}
              discountPrice={product?.discountPrice}
              popularity={product?.popularity}
              stock={product?.stock}
              rating={product?.rating}
              colors={product?.colors}
              sizes={product?.sizes}
              createdAt={product?.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
    </main>
  );
};
export default SingleProduct;
