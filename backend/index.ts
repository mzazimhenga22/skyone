import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// ✅ This is your frontend's origin (9000)
app.use(cors({
  origin: true, // or just `app.use(cors())`
  credentials: true,
}));

app.use(express.json());

app.use("/admin", adminRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
