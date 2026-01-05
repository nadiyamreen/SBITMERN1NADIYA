const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());

// ✅ Static images
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// ✅ Routes
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const supportstaffRoutes = require("./routes/supportstaffRoutes");
const hostelstaffRoutes = require("./routes/hostelstaffRoutes");
const managementRoutes = require("./routes/managementRoutes");
const feedbackRoute = require("./routes/feedbackRoute");
const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", studentRoutes);
app.use("/api", facultyRoutes);
app.use("/api", supportstaffRoutes);
app.use("/api", hostelstaffRoutes);
app.use("/api", managementRoutes);
app.use("/api", feedbackRoute);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

