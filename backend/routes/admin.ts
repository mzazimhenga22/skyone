import express from "express";
import { supabase } from "../supabaseClient"; // adjust this path if needed

const router = express.Router();

/**
 * GET /admin/dashboard
 * Fetch all orders from the Supabase 'orders' table.
 * In production, ensure this route is protected (e.g., with admin token or session check).
 */
router.get("/users", async (req, res) => {
    console.log("Received /admin/users request");
  
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
  
      if (error) {
        console.error("Supabase admin error:", error);
        return res.status(500).json({ error: error.message });
      }
  
      console.log("Fetched users:", data.users.length);
      return res.json({ users: data.users });
    } catch (err) {
      console.error("Unexpected server error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

export default router;
