import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsGrid, BsListUl, BsTrash } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import ProductUpdateModal from "./ProductUpdateModal";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      // Fetch all products when the search box is empty
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Filter products based on the search text
      const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  const handleDelete = async (productId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleRowClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {isGridView ? (
        <>
          <div className="container mx-auto flex justify-between items-center my-4 px-4 md:px-0 max-w-screen-xl">
            <h2 className="text-2xl font-bold col-span-full">
              La liste des produits
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-80 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Rechercher le nom du produit..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <p className="flex items-center">
              <button
                className="cursor-pointer rounded-md hover:bg-black/20 m-1 p-1 transition-all duration-300 disabled:opacity-20 disabled:hover:bg-white"
                onClick={() => setIsGridView(true)}
                disabled={isGridView}
              >
                <BsGrid size={24} title="Affichage en grille" />
              </button>
              <button
                className="cursor-pointer rounded-md hover:bg-black/30 m-1 p-1 transition-all duration-300 disabled:opacity-20 disabled:hover:bg-white"
                onClick={() => setIsGridView(false)}
                disabled={!isGridView}
              >
                <BsListUl size={24} title="Affichage en liste" />
              </button>
              <Link
                to="/add-product"
                className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
              >
                Ajouter un produit
              </Link>
            </p>
          </div>
          <div className="container mx-auto py-4 md:p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-0 max-w-screen-xl">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`products/${product.id}`}
                className="border rounded-md shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={`http://localhost:5000/${product.imagePath}`}
                  alt={product.product_name}
                  className="w-full h-72 object-cover rounded-t-md"
                />
                <div className="p-4 relative">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.product_name}
                  </h3>
                  <p>
                    Prix unitaire:{" "}
                    <span className="font-bold">{product.price}FCFA</span>
                  </p>
                  <p>
                    Quantité en stock:{" "}
                    <span className="font-semibold">
                      {product.quantity_on_hand} pieces.
                    </span>
                  </p>
                  <div className="absolute right-3 bottom-3">
                    <button
                      className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={(e) => handleDelete(product.id, e)}
                    >
                      <BsTrash size={24} title="Supprimer ce produit" />
                    </button>
                    <button
                      className="px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={(e) => handleUpdateClick(product, e)}
                    >
                      <PiNotePencil size={24} title="Modifier ce produit" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="container mx-auto pt-4 max-w-screen-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold col-span-full">
              La liste des produits
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-80 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Rechercher le nom du produit..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <p className="flex">
              <button
                className="cursor-pointer rounded-md hover:bg-black/20 m-1 p-1 transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white"
                onClick={() => setIsGridView(true)}
                disabled={isGridView}
              >
                <BsGrid size={24} title="Affichage en grille" />
              </button>
              <button
                className="cursor-pointer rounded-md hover:bg-black/30 m-1 p-1 transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white"
                onClick={() => setIsGridView(false)}
                disabled={!isGridView}
              >
                <BsListUl size={24} title="Affichage en liste" />
              </button>
              <Link
                to="/add-product"
                className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
              >
                Ajouter un produit
              </Link>
            </p>
          </div>
          <table className="border-collapse w-full">
            <thead>
              <tr className="border-t">
                <th className="p-2">Image du produit</th>
                <th className="p-2">Nom du produit</th>
                <th className="p-2">Prix Unitaire du produit</th>
                <th className="p-2">Quantité en stock</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t cursor-pointer hover:bg-slate-400"
                  onClick={() => handleRowClick(product.id)}
                >
                  <td className="p-2 flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${product.imagePath}`}
                      alt={product.product_name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2 text-center">{product.product_name}</td>
                  <td className="p-2 text-center">{product.price} FCFA</td>
                  <td className="p-2 text-center">
                    {product.quantity_on_hand} pieces
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={(e) => handleDelete(product.id, e)}
                    >
                      <BsTrash size={24} title="Supprimer ce produit" />
                    </button>
                    <button
                      className="px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={(e) => handleUpdateClick(product, e)}
                    >
                      <PiNotePencil size={24} title="Modifier ce produit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for updating a product */}
      {selectedProduct && (
        <ProductUpdateModal
          product={selectedProduct}
          categories={categories}
          suppliers={suppliers}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default ProductList;
