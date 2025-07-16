import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Edit, Trash, Percent, Flame, Sparkles, Clock } from "lucide-react";

// Define a product type
type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: string;
  new?: boolean;
  hot?: boolean;
  discount?: string;
  lowStock?: boolean;
};

// Predefined categories (dynamic)
const initialCategories = ["Electronics", "Furniture", "Clothing", "Appliances"];

const VendorPortalPage = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Wireless Headphones", stock: 10, price: 199, category: "Electronics", new: true, discount: "10% Off" },
    { id: 2, name: "Wooden Chair", stock: 3, price: 119, category: "Furniture", hot: true, lowStock: true },
  ]);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "", stock: 0, price: 0, category: "", new: false, hot: false, discount: "", lowStock: false,
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.stock >= 0 && newProduct.price >= 0 && newProduct.category) {
      const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { id: newId, ...newProduct, lowStock: newProduct.stock <= 3 }]);
      setNewProduct({ name: "", stock: 0, price: 0, category: "", new: false, hot: false, discount: "", lowStock: false });
    } else {
      alert("Please fill all fields");
    }
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      setProducts(
        products.map((p) => (p.id === editProduct.id ? { ...editProduct, lowStock: editProduct.stock <= 3 } : p))
      );
      setEditProduct(null);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } else {
      alert("Category already exists or is invalid");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#d3d2d2] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vendor Portal</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manage your products and inventory</p>
        </div>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </header>
  
      {/* Product Form */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">{editProduct ? "Update Product" : "Add New Product"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={editProduct ? editProduct.name : newProduct.name}
            onChange={(e) =>
              editProduct
                ? setEditProduct({ ...editProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Stock"
            value={editProduct ? editProduct.stock : newProduct.stock}
            onChange={(e) =>
              editProduct
                ? setEditProduct({ ...editProduct, stock: Number(e.target.value) })
                : setNewProduct({ ...newProduct, stock: Number(e.target.value) })
            }
            className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct ? editProduct.price : newProduct.price}
            onChange={(e) =>
              editProduct
                ? setEditProduct({ ...editProduct, price: Number(e.target.value) })
                : setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
            className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <div className="flex flex-col md:flex-row gap-2 col-span-full md:col-span-1">
            <select
              value={editProduct ? editProduct.category : newProduct.category}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, category: e.target.value })
                  : setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white flex-1"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white flex-1"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md whitespace-nowrap"
            >
              Add
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editProduct ? editProduct.new : newProduct.new}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, new: e.target.checked })
                  : setNewProduct({ ...newProduct, new: e.target.checked })
              }
              className="h-4 w-4"
            />
            New
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editProduct ? editProduct.hot : newProduct.hot}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, hot: e.target.checked })
                  : setNewProduct({ ...newProduct, hot: e.target.checked })
              }
              className="h-4 w-4"
            />
            Hot
          </label>
          <input
            type="text"
            placeholder="Discount (e.g., 10% Off)"
            value={editProduct ? editProduct.discount : newProduct.discount}
            onChange={(e) =>
              editProduct
                ? setEditProduct({ ...editProduct, discount: e.target.value })
                : setNewProduct({ ...newProduct, discount: e.target.value })
            }
            className="p-2 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white col-span-full md:col-span-2"
          />
        </div>
  
        <div className="mt-6">
          <button
            onClick={editProduct ? handleUpdateProduct : handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {editProduct ? "Update Product" : "Add Product"}
          </button>
          {editProduct && (
            <button
              onClick={() => setEditProduct(null)}
              className="ml-3 px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
  
      {/* Product Table */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 mb-4 rounded-md bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-gray-300 dark:border-gray-700">
              <tr>
                <th className="py-2">ID</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Category</th>
                <th>Badges</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((p) => (
                  <tr key={p.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="py-2">{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.stock}</td>
                    <td>${p.price}</td>
                    <td>{p.category}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {p.discount && (
                          <span className="flex items-center gap-1 bg-green-400 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm rotate-[-6deg]">
                            <Percent className="w-3 h-3" />
                            {p.discount}
                          </span>
                        )}
                        {p.hot && (
                          <span className="flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            <Flame className="w-3 h-3" />
                            Hot
                          </span>
                        )}
                        {p.new && (
                          <span className="flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            New
                          </span>
                        )}
                        {p.lowStock && (
                          <span className="flex items-center gap-1 bg-yellow-300 text-black text-xs font-semibold px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" />
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setEditProduct(p)}
                          className="p-1 bg-blue-600 text-white rounded-md"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1 bg-red-600 text-white rounded-md"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}  
export default VendorPortalPage;