import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AccountPage = () => {
  const [userData, setUserData] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserData({
          name: user.user_metadata?.name || "",
          email: user.email || "",
        });
        setName(user.user_metadata?.name || "");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    setMessage("");
    const { error } = await supabase.auth.updateUser({ data: { name } });

    if (error) {
      setMessage("❌ Failed to update name.");
    } else {
      setUserData((prev) => ({ ...prev, name }));
      setMessage("✅ Name updated successfully.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 dark:text-white">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#d3d2d2] dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold text-center">Account Overview</h1>

        {/* Profile Card */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Profile Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
              <input
                value={userData.email}
                disabled
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Save Changes
            </button>
          </div>
          {message && <p className="text-sm text-center text-green-500 dark:text-green-400">{message}</p>}
        </div>

        {/* Order Card */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold">Order History</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">You haven't placed any orders yet.</p>
        </div>

        {/* Payment Card */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold">Payment Methods</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">No saved payment methods.</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
