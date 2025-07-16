import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 5000); // auto-redirect after 5 seconds
  };

  if (showSuccess) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-center text-gray-900 dark:text-white px-4">
        <div className="text-3xl sm:text-4xl font-bold mb-4">🎉 Congratulations!</div>
        <p className="text-lg mb-6">Your order has been placed successfully.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Continue Shopping
        </button>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <style>
          {`
            .confetti {
              position: absolute;
              top: 0;
              width: 8px;
              height: 12px;
              background-color: hsl(${Math.random() * 360}, 70%, 60%);
              opacity: 0.9;
              border-radius: 2px;
            }

            @keyframes confetti-fall {
              0% {
                transform: translateY(-100%) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
              }
            }

            .animate-confetti {
              animation: confetti-fall linear forwards;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-transparent text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6 text-lg font-semibold">
              <span>Total</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Shipping Address</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Card Details</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
