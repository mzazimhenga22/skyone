import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://4000-firebase-skyone-1752575704215.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/admin/users");
        setUsers(res.data.users || []);
      } catch (err: any) {
        const message =
          err?.response?.data?.error ||
          err?.message ||
          "Unknown error occurred";
        setError(message);
        console.error("Failed to fetch users:", message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white/50 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-white/20 p-4 rounded-lg shadow"
              >
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.user_metadata?.name || "N/A"}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
