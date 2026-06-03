import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/CartContext";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

type Product = {
  id: string | number;
  name: string;
  image?: string;
  price: number;
  // imageUrl?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = UseCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;

  const grandTotal = cartTotal + deliveryFee;

  return (
    // For overlay
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 bg-black/40 z-50 transition-opacity"
    >
      {/* Sidebar  codeeeee */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 h-full w-80 max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header  */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-taupe-600 transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="size-1/6 mb-4" />
              <h3 className="text-lg font-medium mb-1">Your Cart is empty</h3>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-pink-300 rounded-xl p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-1/6 rounded-lg object-cover shrink-0"
                />
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-olive-400">
                    {currency}
                    {item.product.price.toFixed(2)}
                  </p>
                  {/* Increase and Decrease the product quantity  */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(
                            String(item.product.id),
                            item.quantity - 1,
                          )
                        }
                        className="size-7 rounded-lg bg-white border flex items-center justify-center"
                      >
                        <MinusIcon className="size-3" />
                      </button>

                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            String(item.product.id),
                            item.quantity + 1,
                          )
                        }
                        className="size-7 rounded-lg bg-white border flex items-center justify-center"
                      >
                        <PlusIcon className="size-3" />
                      </button>
                    </div>

                    {/* Right Side  */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {currency}{" "}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeFromCart(String(item.product.id))}
                        className="p-1 text-amber-200 hover:text-app-error transition-colors"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                  {/* =========================== */}
                </div>
              </div>
            ))
          )}
        </div>
        {/* Footer  */}
        {items.length > 0 && (
          <div className="p-5 border-t border-amber-300 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-amber-600"> Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-amber-600"> Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-shadow-fuchsia-300">Free</span>
                ) : (
                  `${currency}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-xs text-yellow-800 text-center">
                Free delivery on orders over {currency} 20!
              </p>
            )}

            <div className="flex justify-between text-base font-semibold border-t border-amber-900 pt-3">
              <span>Total</span>
              <span>
                {currency}
                {grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/Checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-orange-400 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              Proceed to Checkout <ArrowRightIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
