import { useNavigate } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import { UseCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  discount: number;
  rating: number;
  reviewCount: number;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = UseCart();
  const navigate = useNavigate();
  // currency symbol (define here to avoid "Cannot find name 'currency'" error)
  const currency = "₹";

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* image */}

      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-4 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-orange-500 text-white rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* infoo  */}
      <div className="p-3 text-zinc-700">
        <h3 className="text-sm leading-snug mb-1.5 line-clamp-1">
          {product.name}
        </h3>

        {/* ratinggg */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-4 fill-amber-200 text-shadow-pink-300" />
            <span className="text-xs font-medium ">{product.rating}</span>
            <span className="text-xs text-lime-700">{product.reviewCount}</span>
          </div>
        )}

        {/* price + add  */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 truncate">
            <span className="text-base font-medium">
              {currency}
              {product.price.toFixed(1)}
            </span>
            <span className="text-xs text-lime-700 block">/{product.unit}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-lime-600 line-through ml-1.5">
                {currency}
                {product.originalPrice.toFixed(1)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // the cart expects an `id` field (not `_id`), map it here
              const cartProduct: Product & { id: string } = {
                ...product,
                id: product._id,
              };
              addToCart(cartProduct);
            }}
            className="size-7 rounded-full bg-orange-600 text-white flex items-center justify-center  shrink-0 hover:bg-orange-900 transition-colors active:scale-95 "
          >
            <Plus className="size-4 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
