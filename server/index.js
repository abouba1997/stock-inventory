const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/product");
const suppliersRouter = require("./routes/supplier");
const clientsRouter = require("./routes/client");
const categoriesRouter = require("./routes/category");
const userRouter = require("./routes/user");
const salesRouter = require("./routes/sale");
const saleItemsRouter = require("./routes/sale_item");
const paymentMethodRouter = require("./routes/payment_method");

const app = express();
app.use(cors());
app.use(express.json());

// accessing image from the frontend
app.use("/uploads", express.static("uploads"));

// Use the users router
app.use("/users", userRouter);

// Use the products router
app.use("/products", productsRouter);

// Use the suppliers router
app.use("/suppliers", suppliersRouter);

// Use the clients router
app.use("/clients", clientsRouter);

// Use the categories router
app.use("/categories", categoriesRouter);

app.use("/payment_methods", paymentMethodRouter);

app.use("/sales", salesRouter);

app.use("/sale_items", saleItemsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
