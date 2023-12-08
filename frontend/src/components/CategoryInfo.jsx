import axios from "axios";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";

const CategoryInfo = () => {
  const { category_id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          `http://localhost:5000/categories/${category_id}`
        );
        setCategory(categoryResponse.data);

        const categoryProducts = await axios.get(
          `http://localhost:5000/categories/products/${category_id}`
        );
        setProducts(categoryProducts.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [category_id]);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      try {
        const response = await axios.get(
          `http://localhost:5000/categories/products/${category_id}`
        );
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

  const handleUpdate = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold col-span-full">
            Bienvenue dans la categorie: {category && category.category_name}
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
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="Recherche du produit..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <Link
            to="/category-list"
            className="py-2 px-4 bg-slate-400 rounded-md hover:text-black/70"
          >
            Retourner a la liste des categories
          </Link>
          <Link
            to="/add-product"
            className="py-2 px-4 bg-slate-400 rounded-md hover:text-black/70"
          >
            Ajouter des produits
          </Link>
        </div>
        {products.length > 0 ? (
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
                      onClick={(e) => handleUpdate(product, e)}
                    >
                      <PiNotePencil size={24} title="Modifier ce produit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <div className="border-t pt-2 h-96 flex justify-center items-center">
              <span className="italic text-slate-950 text-xl">
                Pas produits ajouter pour cette categorie!
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryInfo;
