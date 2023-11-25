/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryModal = ({
  category,
  mode,
  isOpen,
  setShowModal,
  handleClose,
}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category && category.category_name) {
      setCategoryName(category.category_name);
    } else {
      setCategoryName("");
    }
  }, [category]);

  const handleCategoryAction = async () => {
    try {
      if (mode === "Ajouter") {
        await axios.post(`http://localhost:5000/categories`, {
          category_name: categoryName,
        });
        handleClose();
        toast.success(`${categoryName} cree avec succes`);
        setShowModal(false);
        setCategoryName("");
      } else if (mode === "Editer") {
        await axios.put(`http://localhost:5000/categories/${category.id}`, {
          category_name: categoryName,
        });
        handleClose();
        toast.success(`${categoryName} mise a jour`);
        setShowModal(false);
        setCategoryName("");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'opération");
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto w-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="flex items-center justify-center min-h-screen bg-black/50"
        onClick={handleClose}
      >
        <div
          className="bg-white p-8 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">
            {mode === "Ajouter"
              ? "Ajouter une catégorie"
              : "Modifier la catégorie"}
          </h2>
          <input
            type="text"
            name="category_name"
            placeholder="Nom de la catégorie"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            autoFocus
            required
          />
          <button
            onClick={handleCategoryAction}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {mode === "Ajouter" ? "Enregistrer" : "Editer"}
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md ml-2 hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
