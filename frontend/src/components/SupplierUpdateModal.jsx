/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const defaultFormData = {
  supplier_name: "",
  supplier_email: "",
  supplier_contact: "",
  supplier_address: "",
  supplierImage: "",
};

const SupplierUpdateModal = ({ supplier, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    supplier_name: supplier.supplier_name || "",
    supplier_email: supplier.supplier_email || "",
    supplier_contact: supplier.supplier_contact || "",
    supplier_address: supplier.supplier_address || "",
    supplierImage: supplier.supplierImage || "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (
      supplier &&
      supplier.supplier_name &&
      supplier.supplier_email &&
      supplier.supplier_address &&
      supplier.supplier_contact
    ) {
      setFormData({
        ...defaultFormData,
        supplier_name: supplier.supplier_name,
        supplier_email: supplier.supplier_email,
        supplier_contact: supplier.supplier_contact,
        supplier_address: supplier.supplier_address,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [supplier]);

  const handleChange = (e) => {
    if (e.target.name === "supplierImage") {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
        setFormData({ ...formData, supplierImage: uploadedFile });
      } else {
        setFile(null);
        setFormData({ ...formData, supplierImage: null });
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
        `http://localhost:5000/suppliers/${supplier.id}`,
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
      toast.success("Fournisseur mise a jour avec succes!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute left-[50%] top-2 translate-x-[-50%] w-full bg-black/60 pb-4 h-screen"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-md mx-auto py-4 px-10 rounded-md relative translate-y-[-50%] top-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="cursor-pointer p-2 absolute right-0 top-0"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </span>
        <h2 className="text-lg text-center font-semibold pb-2">
          Mettre a jour le {supplier.supplier_name}{" "}
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
                  src={`http://localhost:5000/${supplier.imagePath}`}
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
                    Ajouter une image/logo du fournisseur ou glisser et deposer
                    la photo du fournisseur
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
              htmlFor="supplier_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nom du fournisseur
            </label>
            <input
              type="text"
              id="supplier_name"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Entrez le nom du fournisseur"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="supplier_email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email du fournisseur
            </label>
            <input
              type="email"
              id="supplier_email"
              name="supplier_email"
              value={formData.supplier_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Entrez l'email du fournisseur"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="supplier_contact"
              className="block text-gray-700 font-bold mb-2"
            >
              Contact du fournisseur
            </label>
            <input
              type="text"
              id="supplier_contact"
              name="supplier_contact"
              value={formData.supplier_contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Entrez le contact du fournisseur"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="supplier_address"
              className="block text-gray-700 font-bold mb-2"
            >
              L&apos;addresse du fournisseur
            </label>
            <input
              type="text"
              id="supplier_address"
              name="supplier_address"
              value={formData.supplier_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Entrez l'addresse du fournisseur"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Mettre a jour le fournisseur
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierUpdateModal;
