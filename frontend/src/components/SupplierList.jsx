import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import { toast } from "react-toastify";
import SupplierUpdateModal from "./SupplierUpdateModal";

const SupplierList = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      // Fetch all suppliers when the search box is empty
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Filter suppliers based on the search text
      const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.supplier_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuppliers(filteredSuppliers);
    }
  };

  const handleDelete = async (supplierId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/suppliers/${supplierId}`);
      setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'opération");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (supplier, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleRowClick = (supplierId) => {
    navigate(`/suppliers/${supplierId}`);
  };

  return (
    <>
      <div className="container mx-auto p-4 xl:p-0 xl:pt-4 max-w-screen-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold col-span-full">
            La liste des fournisseurs
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
              placeholder="Rechercher le nom du fournisseur..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <p className="flex">
            <Link
              to="/add-supplier"
              className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
            >
              Ajouter un fournisseur
            </Link>
          </p>
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-t">
              <th className="p-2">Image/Logo du fournisseur</th>
              <th className="p-2">Nom du fournisseur</th>
              <th className="p-2">Contact du fournisseur</th>
              <th className="p-2">Email du fournisseur</th>
              <th className="p-2">Addresse du fournisseur</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-t cursor-pointer hover:bg-slate-400"
                onClick={() => handleRowClick(supplier.id)}
              >
                <td className="p-2 flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/${supplier.imagePath}`}
                    alt={supplier.supplier_name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
                <td className="p-2 text-center">{supplier.supplier_name}</td>
                <td className="p-2 text-center">{supplier.supplier_contact}</td>
                <td className="p-2 text-center">{supplier.supplier_email}</td>
                <td className="p-2 text-center">{supplier.supplier_address}</td>
                <td className="p-2 text-center">
                  <button
                    className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={(e) => handleDelete(supplier.id, e)}
                  >
                    <BsTrash size={24} title="Supprimer ce produit" />
                  </button>
                  <button
                    className="px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={(e) => handleUpdateClick(supplier, e)}
                  >
                    <PiNotePencil size={24} title="Modifier ce produit" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for updating a supplier */}
      {selectedSupplier && (
        <SupplierUpdateModal
          supplier={selectedSupplier}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default SupplierList;
