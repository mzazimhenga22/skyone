import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Box,
  BarChart2,
  DollarSign,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

const tabs = [
  { name: "Overview", icon: <BarChart2 className="w-5 h-5" /> },
  { name: "Orders", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Products", icon: <Box className="w-5 h-5" /> },
  { name: "Analytics", icon: <DollarSign className="w-5 h-5" /> },
];

const ordersData = [
  { id: 1, item: "Wireless Headphones", amount: 199, date: "2025-07-11", status: "Delivered" },
  { id: 2, item: "Wooden Chair", amount: 119, date: "2025-07-12", status: "Pending" },
];

const salesGraph = [
  { date: "Jan", Sales: 4000 },
  { date: "Feb", Sales: 2400 },
  { date: "Mar", Sales: 3500 },
  { date: "Apr", Sales: 2800 },
  { date: "May", Sales: 3900 },
  { date: "Jun", Sales: 4500 },
];

const VendorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [vendorInfo, setVendorInfo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showRevenueDialog, setShowRevenueDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isVendorPortal, setIsVendorPortal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vendorInfo");
    setVendorInfo(stored ? JSON.parse(stored) : {
      businessName: "Demo Store",
      category: "Electronics",
      lowStock: 3,
    });
  }, []);

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordError("");
    setPasswordInput("");
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === "vendor2025") {
      setShowPasswordModal(false);
      if (isVendorPortal) {
        setIsVendorPortal(false);
        navigate("/vendor-portal");
      } else {
        setShowRevenueDialog(true);
      }
    } else {
      setPasswordError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#d3d2d2] dark:bg-gray-950 text-gray-900 dark:text-white p-4 sm:p-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Vendor Dashboard</h1>
          {vendorInfo && (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, <span className="font-medium">{vendorInfo.businessName}</span> — {vendorInfo.category}
              </p>
              <button
                onClick={() => {
                  setShowPasswordModal(true);
                  setPasswordError("");
                  setPasswordInput("");
                  setIsVendorPortal(true);
                }}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Go to Vendor Portal
              </button>
            </>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </header>

      {vendorInfo?.lowStock && (
        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
          Low stock alert: {vendorInfo.lowStock} items
        </div>
      )}

      <nav className="flex flex-wrap gap-2 sm:space-x-4 border-b border-gray-300 dark:border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-3 py-2 -mb-px font-medium text-sm sm:text-base ${
              activeTab === tab.name
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </nav>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Enter Password</h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter vendor password"
                className="w-full p-2 rounded-md bg-white/50 dark:bg-gray-700 text-gray-800 dark:text-white pr-10 text-sm"
              />
              <button
                className="absolute right-2 top-2 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showRevenueDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Revenue Details</h3>
            <p className="text-sm">Total Revenue: $12,450</p>
            <p className="text-sm">Monthly Growth: 5.2%</p>
            <p className="text-sm">Top Product: Wireless Headphones ($4,200)</p>
            <button
              onClick={() => setShowRevenueDialog(false)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="p-4 sm:p-6 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow">
            <h3 className="text-sm uppercase text-gray-500 flex items-center justify-between">
              Total Revenue
              <button onClick={openPasswordModal}>
                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </h3>
            <p className="text-xl sm:text-2xl font-semibold mt-2">$••••</p>
          </div>
          <div className="p-4 sm:p-6 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow">
            <h3 className="text-sm uppercase text-gray-500">Total Orders</h3>
            <p className="text-xl sm:text-2xl font-semibold">135</p>
          </div>
          <div className="p-4 sm:p-6 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow">
            <h3 className="text-sm uppercase text-gray-500">Products Listed</h3>
            <p className="text-xl sm:text-2xl font-semibold">24</p>
          </div>
        </div>
      )}

      {activeTab === "Orders" && (
        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Orders</h2>
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-2 mb-4 rounded-md bg-white/50 dark:bg-gray-700 text-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-gray-300 dark:border-gray-600">
                <tr>
                  <th className="py-2 px-2 sm:px-4">ID</th>
                  <th className="py-2 px-2 sm:px-4">Item</th>
                  <th className="py-2 px-2 sm:px-4 hidden sm:table-cell">Date</th>
                  <th className="py-2 px-2 sm:px-4 hidden sm:table-cell">Status</th>
                  <th className="py-2 px-2 sm:px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {ordersData
                  .filter((o) => o.item.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((o) => (
                    <tr key={o.id} className="border-b border-gray-300 dark:border-gray-600">
                      <td className="py-2 px-2 sm:px-4">{o.id}</td>
                      <td className="py-2 px-2 sm:px-4">{o.item}</td>
                      <td className="py-2 px-2 sm:px-4 hidden sm:table-cell">{o.date}</td>
                      <td className="py-2 px-2 sm:px-4 hidden sm:table-cell">{o.status}</td>
                      <td className="py-2 px-2 sm:px-4">${o.amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Analytics" && (
        <div className="bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesGraph}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Sales" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default VendorDashboardPage;