const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/product");
const suppliersRouter = require("./routes/supplier");
const categoriesRouter = require("./routes/category");
const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

// accessing image from the frontend
app.use("/uploads", express.static("uploads"));

// Use the users router
app.use("/users", userRouter);

// Use the products router
app.use("/products", productsRouter);

// Use the products router
app.use("/suppliers", suppliersRouter);

// Use the categories router
app.use("/categories", categoriesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
