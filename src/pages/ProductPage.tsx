import { useNavigate, useParams, Link } from "react-router-dom";
import { UseCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { productSeparateData } from "../data/productSeparateData";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import Loading from "../components/Loading";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";

type Product = {
  id: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  discount: number;
  reviewCount: number;
  stock: number;
  category: string;
  rating: number;
  description?: string;
  organic?: boolean;
  hasFilters?: boolean;
  isOrganic?: boolean;
};



const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = UseCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(localQuantity + 1);
    window.scrollTo(0, 0);
    const product = productSeparateData.find((p)=> p._id === id);
    // if (!product) return null;
    setProduct(product!);
    setRelatedProducts(productSeparateData.filter((p) => p._id !== id));
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  // const displayQuantity = localQuantity ?? cartItem?.quantity ?? 1
 const categoryLabel = product.category.replace(/-/g, " ");

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuantity(product.id, cartItem.quantity - 1);
      else removeFromCart(product.id);
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handlePlus = () => {
    if (inCart) updateQuantity(product.id, cartItem.quantity + 1);
    else setLocalQuantity(localQuantity + 1);
  };

 

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* BreadCrumb  */}
        <nav className="flex items-center gap-2 text-sm text-amber-950 mb-6">
          <Link to='/' className="hover:text-green-950 transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="hover:text-green-950 transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-green-950 transition-colors capitalize"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-green-950 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
        {/* Back Button  */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm text-amber-950 hover:text-green-950 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back
        </button>
        {/* product Details section  */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* left side image */}
            <div className="relative inline-block flex items-center justify-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[360px] w-auto object-contain"
              />
              <div className="absolute top-8 md:top-11.5 gap-1.5">


                {/* Badges  */}
                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-950 text-white rounded-full">
                    <LeafIcon className="w-3 h-3" />
                    Organic
                  </span>
                )}

                {product.discount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-semibold bg-orange-500 text-white rounded-full">
                    {product.discount} % OFF
                  </span>
                )}
              </div>
            </div>

            {/* right side details  */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-sm font-medium text-amber-950 tracking-wider mb-2 capitalize">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold text-green-950 mb-2.5">
                {product.name}
              </h1>
              {/* Ratings */}

              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(product.rating) ? "star-fill-orange" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-lime-950">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* PRICE    */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-semibold text-green-950">
                  {currency}
                  {product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-900 line-through">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Descriptiob */}
              <p className="text-sm text-amber-950 leading-relaxed mb-6">
                {product.description}
              </p>
              {/* stock  */}

              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-sm font-medium text-green-500">
                    ✔ In Stock ({product.stock})available
                  </span>
                ) : (
                  <span className="text-sm font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity + add to cart */}
              {
                /* ye bhi logic chalega definitely
                      onClick={() => {
                      if (displayQuantity <= 1) return;
                      setLocalQuantity(displayQuantity - 1);

                      if (inCart) {
                        updateQuantity(product._id, displayQuantity - 1);
                      }
                    } */
                //  onClick={() => {
                //   setLocalQuantity(displayQuantity + 1);
                //   if (inCart) {
                //     updateQuantity(product._id, displayQuantity + 1);
                //   }
                // }}
              }

              <div className="flex items-center gap-3">
                {/* qunatity */}
                <div className="flex items-center border border-amber-600 rounded-xl overflow-hidden">
                  <button
                    onClick={handleMinus}
                    className="p-3 hover:bg-amber-400 transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>

                  <span className="px-5 text-sm font-semibold min-w-[40px] text-center">
                    {displayQuantity}
                  </span>

                  <button
                    onClick={handlePlus}
                    className="p-3 hover:bg-amber-400 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* add to cart */}
                <button
                  onClick={() => {
                    if (!inCart) addToCart(product, localQuantity);
                  }}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-amber-300 text-gray-950 border border-amber-600" : "bg-orange-500 text-white hover:bg-orange-700"}`}
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* customer reviews */}
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-44">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-green-950">
                  Related Products
                </h2>
                <p className="text-sm text-amber-900 mt-1">
                  More from {categoryLabel}
                </p>
              </div>
              <Link
                className="text-sm font-semibold text-orange-600 hover:text-orange-800 flex items-center gap-1 transition-colors"
                to={`/products?category=${product.category}`}
              >
                View All <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
