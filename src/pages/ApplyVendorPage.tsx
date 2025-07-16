import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyVendorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("vendorInfo", JSON.stringify(formData)); // optional
    navigate("/vendor-dashboard");
  };  

  return (
    <div className="min-h-screen px-6 py-12 bg-transparent text-gray-900 dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Join as a Vendor</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enter your details to become a vendor on our platform.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-transparent p-6 rounded-xl border border-gray-300 dark:border-gray-700 backdrop-blur-sm"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Business Name</label>
            <input
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700"
              placeholder="SkyOne Solutions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700"
              placeholder="e.g. Fashion, Electronics"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700"
              placeholder="vendor@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700"
              placeholder="+254712345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Brief Description</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700"
              placeholder="Tell us more about your business..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyVendorPage;
