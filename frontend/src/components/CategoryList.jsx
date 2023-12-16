import axios from "axios";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import { toast } from "react-toastify";

const CategoryList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("Ajouter");
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [category, showModal]);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Filter products based on the search text
      const filteredCategories = categories.filter((categorie) =>
        categorie.category_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCategories(filteredCategories);
    }
  };

  const handleAdd = () => {
    setMode("Ajouter");
    setShowModal(true);
  };

  const handleUpdate = (category, e) => {
    e.stopPropagation();
    setCategory(category);
    setMode("Editer");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCategory(null);
  };

  const handleRowClick = (categorieId) => {
    navigate(`/category-list/${categorieId}`);
  };

  const handleDelete = async (category_id, e) => {
    e.stopPropagation();

    try {
      await axios.delete(`http://localhost:5000/categories/${category_id}`);
      setCategories(
        categories.filter((categorie) => categorie.id !== category_id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'opération");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 xl:p-0 xl:pt-4 max-w-screen-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold col-span-full">
            La liste des categories
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
              placeholder="Rechercher le nom de la categorie..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <p className="flex">
            <Link
              onClick={handleAdd}
              className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
            >
              Ajouter une categorie
            </Link>
          </p>
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-t">
              <th className="p-2">ID du categorie</th>
              <th className="p-2">Nom de la categorie</th>
              <th className="p-2">Action de la categorie</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr
                key={categorie.id}
                className="border-t cursor-pointer hover:bg-slate-400"
                onClick={() => handleRowClick(categorie.id)}
              >
                <td className="p-2 text-center">{categorie.id}</td>
                <td className="p-2 text-center">{categorie.category_name}</td>
                <td className="p-2 text-center">
                  <button
                    className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={(e) => handleDelete(categorie.id, e)}
                  >
                    <BsTrash size={24} title="Supprimer ce produit" />
                  </button>
                  <button
                    className="px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={(e) => handleUpdate(categorie, e)}
                  >
                    <PiNotePencil size={24} title="Modifier ce produit" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <CategoryModal
        category={mode === "Editer" ? category : ""}
        mode={mode}
        isOpen={showModal}
        setShowModal={setShowModal}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default CategoryList;
