import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Root from "./components/Root";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProductDetails from "./components/ProductDetails";
import Home from "./components/Home";
import Menu from "./components/Menu";
import CategoryList from "./components/CategoryList";
import ClientList from "./components/ClientList";
import SupplierList from "./components/SupplierList";
import SupplierDetails from "./components/SupplierDetails";
import SupplierForm from "./components/SupplierForm";
import ClientForm from "./components/ClientForm";
import SellingPage from "./components/SellingPage";
import SellHistory from "./components/SellHistory";
import SellHistoryPopup from "./components/SellHistoryPopup";
import CategoryInfo from "./components/CategoryInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products-list" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category-list/:category_id" element={<CategoryInfo />} />
        <Route path="/clients-list" element={<ClientList />} />
        <Route path="/add-client" element={<ClientForm />} />
        <Route path="/suppliers-list" element={<SupplierList />} />
        <Route path="/add-supplier" element={<SupplierForm />} />
        <Route path="/suppliers/:supplierId" element={<SupplierDetails />} />
        <Route path="/sell-list" element={<SellingPage />} />
        <Route path="/sell-history" element={<SellHistory />} />
        <Route path="/sell-history/:sale_id" element={<SellHistoryPopup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
