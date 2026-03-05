const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
<<<<<<< HEAD
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const opportunitiesRoute = require("./routes/opportunities");

app.use("/api/auth", authRoutes);
=======
app.use(cors());
app.use(express.json());

// Routes
const opportunitiesRoute = require("./routes/auth");
>>>>>>> 389172b320a9acd15435ecf0d2199276abbb2dc4
app.use("/api/opportunities", opportunitiesRoute);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
<<<<<<< HEAD
=======
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
>>>>>>> 389172b320a9acd15435ecf0d2199276abbb2dc4
