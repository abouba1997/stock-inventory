import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const initialState = {
  product_name: "",
  description: "",
  price: "",
  quantity_on_hand: "",
  category_id: "",
  supplier_id: "",
  productImage: "",
};

const ProductForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
        setFormData({ ...formData, productImage: uploadedFile });
      } else {
        setFile(null);
        setFormData({ ...formData, productImage: null });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData(initialState);
      setFile(null);

      toast.success("Produit ajoutee avec succes!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto my-auto p-4">
        <div>
          <h2 className="text-2xl font-bold text-center mb-3">
            Ajout d&apos;un nouveau produit
          </h2>
          <form onSubmit={handleSubmit} className="w-full md:max-w-md mx-auto">
            <div className="flex items-center justify-center w-full mb-3 flex-col">
              {file && (
                <div id="preview-container" className="mb-3 h-72">
                  <img
                    src={file}
                    alt="Uploaded Image"
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
              )}
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex items-center justify-between px-4">
                  <div className="w-1/12">
                    <svg
                      className="w-8 h-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-col text-center w-11/12">
                    <span className="font-semibold">
                      Ajouter une image du produit ou glisser et deposer la
                      photo du produit
                    </span>
                    <span> SVG, PNG, JPG</span>
                  </div>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="productImage"
                  className="opacity-0 absolute"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="product_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Nom du produit
              </label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez le nom du produit"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description du produit
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez une bref description du produit"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Prix unitaire du produit
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez le prix du produit"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="quantity_on_hand"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantite du produit en stock
              </label>
              <input
                type="number"
                id="quantity_on_hand"
                name="quantity_on_hand"
                value={formData.quantity_on_hand}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez la quantite du produit en stock"
                required
              />
            </div>
            <div className="mb-3">
              <div>
                <label
                  htmlFor="category_id"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Categorie du produit
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="bg-white w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                >
                  <option value="">Selectionner la categorie du produit</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="w-full mx-3 my-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm mt-2 text-right">
                <span>La categorie n&apos;existe pas?</span>
                <Link
                  to="/category-list"
                  className="italic text-blue-500 ml-2 hover:underline transition-all duration-300"
                >
                  Liste des categories
                </Link>
              </div>
            </div>
            <div className="mb-3">
              <div>
                <label
                  htmlFor="supplier_id"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Fournisseur du produit
                </label>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleChange}
                  required
                  className="bg-white w-full px-3 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                >
                  <option value="">Selectionner la categorie du produit</option>
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.id}
                      value={supplier.id}
                      className="w-full mx-3 my-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                      {supplier.supplier_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm mt-2 text-right">
                <span>Le fournisseur n&apos;existe pas?</span>
                <Link
                  to="/suppliers-list"
                  className="italic text-blue-500 ml-2 hover:underline transition-all duration-300"
                >
                  Liste des fournisseurs
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Ajouter le fournisseur
              </button>
              <Link
                to="/products-list"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
