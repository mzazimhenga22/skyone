import { Truck, Package, Bike, Loader2, MapPin, Calendar, Check } from "lucide-react";

const OrderTrackingPage = () => {
  const currentStatus = "In Transit";

  const steps = [
    {
      label: "Order Placed",
      icon: <Package className="w-5 h-5" />,
      time: "July 14, 2:35 PM",
    },
    {
      label: "Processing",
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
      time: "July 14, 3:00 PM",
    },
    {
      label: "In Transit",
      icon: <Truck className="w-5 h-5" />,
      time: "July 15, 9:15 AM",
    },
    {
      label: "Out for Delivery",
      icon: <Bike className="w-5 h-5" />,
      time: "Pending",
    },
    {
      label: "Delivered",
      icon: <Check className="w-5 h-5" />,
      time: "Pending",
    },
  ];

  const getStepClass = (label: string) => {
    if (label === currentStatus) return "bg-green-600 text-white";
    const currentIndex = steps.findIndex((s) => s.label === currentStatus);
    const stepIndex = steps.findIndex((s) => s.label === label);
    return stepIndex < currentIndex
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Track Your Order</h1>

      {/* Tracking Input */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          className="w-full sm:w-96 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        />
        <button className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition">
          Track
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src="/images/headphones.jpg"
            alt="Product"
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Wireless Noise-Canceling Headphones</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: 1</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: #A1B2C3D4</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Placed: July 14, 2025</p>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <MapPin className="w-5 h-5" />
          <span>Delivering to: Nairobi, Kenya</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Calendar className="w-5 h-5" />
          <span>Estimated Delivery: July 16 - July 18</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-8">
        <h2 className="text-lg font-semibold">Tracking Progress</h2>
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-4 relative">
            <div className="relative z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepClass(
                  step.label
                )}`}
              >
                {step.icon}
              </div>
              {idx < steps.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-10 h-8 w-1 bg-gray-300 dark:bg-gray-700 z-0" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{step.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
