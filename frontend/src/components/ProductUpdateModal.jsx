/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const defaultFormData = {
  product_name: "",
  description: "",
  price: "",
  quantity_on_hand: "",
  category_id: "",
  productImage: "",
};

const ProductUpdateModal = ({
  product,
  categories,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    product_name: product.product_name || "",
    description: product.description || "",
    price: product.price || "",
    quantity_on_hand: product.quantity_on_hand || "",
    category_id: product.category_id || "",
    productImage: product.productImage || "",
  });
  const [file, setFile] = useState(null);

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
    console.log(formData);
    try {
      await axios.put(
        `http://localhost:5000/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFile(null);
      onUpdate();
      onClose();
      toast.success("Produit mise a jour avec succes!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute left-[50%] top-2 translate-x-[-50%] w-full bg-black/60 pb-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-md mx-auto py-4 px-10 rounded-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="cursor-pointer p-2 absolute right-0 top-0"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </span>
        <h2 className="text-lg text-center font-semibold pb-2">
          Mettre a jour le {product.product_name}{" "}
        </h2>
        <form onSubmit={handleSubmit} className="w-full md:max-w-md mx-auto">
          <div className="flex items-center justify-center w-full mb-3 flex-col">
            <div id="preview-container" className="mb-3">
              {file ? (
                <img
                  src={file}
                  alt="Uploaded Image"
                  className="object-cover h-full w-full rounded-md"
                />
              ) : (
                <img
                  src={`http://localhost:5000/${product.imagePath}`}
                  alt="Uploaded Image"
                  className="object-cover h-full w-full rounded-md"
                />
              )}
            </div>
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
                    Ajouter une image du produit ou glisser et deposer la photo
                    du produit
                  </span>
                  <span> SVG, PNG, JPG</span>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="productImage"
                className="hidden"
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
              Prix du produit
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Selectionner la categorie du produit</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex gap-2 text-xs py-2">
              <Link className="px-2 py-3 bg-slate-300 text-center rounded-md hover:bg-slate-500">
                Ajouter une categorie
              </Link>
              <Link className="px-2 py-3 bg-slate-300 text-center rounded-md hover:bg-slate-500">
                Modifier cette categorie
              </Link>
              <Link className="px-2 py-3 bg-slate-300 text-center rounded-md hover:bg-slate-500">
                Supprimer cette categorie
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Mettre a jour le produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateModal;
