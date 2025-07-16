import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    cart.forEach(item => removeFromCart(item.id));
  };

  return (
    <div className="min-h-screen px-6 py-12 
                bg-[#d3d2d2]/60 dark:bg-gray-950/60 
                text-gray-900 dark:text-white 
                transition-colors duration-300 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            ← Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1 w-full">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.variant && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Variant: {item.variant}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Est. delivery: 2–5 business days
                  </p>

                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)}>
                  <Trash className="text-red-500 w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Totals & Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-green-600">${total.toFixed(2)}</span>
              </p>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline mt-2"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="text-sm text-green-600 hover:underline"
              >
                ← Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

