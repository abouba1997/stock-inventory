import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import { toast } from "react-toastify";
import ClientUpdateModal from "./ClientUpdateModal";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clients");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      // Fetch all suppliers when the search box is empty
      try {
        const response = await axios.get("http://localhost:5000/clients");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Filter suppliers based on the search text
      const filteredClients = clients.filter((client) =>
        client.client_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setClients(filteredClients);
    }
  };

  const handleDelete = async (clientId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/clients/${clientId}`);
      setClients(clients.filter((client) => client.id !== clientId));
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'opération");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:5000/clients");
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (client, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold col-span-full">
            La liste des clients
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
          <p className="flex">
            <Link
              to="/add-client"
              className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
            >
              Ajouter un client
            </Link>
          </p>
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-t">
              <th className="p-2">Nom du client</th>
              <th className="p-2">Contact du client</th>
              <th className="p-2">Email du client</th>
              <th className="p-2">Addresse du client</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t hover:bg-slate-200">
                <td className="p-2 text-center">{client.client_name}</td>
                <td className="p-2 text-center">{client.client_contact}</td>
                <td className="p-2 text-center">{client.client_email}</td>
                <td className="p-2 text-center">{client.client_address}</td>
                <td className="p-2 text-center">
                  <button
                    className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={(e) => handleDelete(client.id, e)}
                  >
                    <BsTrash size={24} title="Supprimer ce client" />
                  </button>
                  <button
                    className="px-1 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={(e) => handleUpdateClick(client, e)}
                  >
                    <PiNotePencil size={24} title="Modifier ce client" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for updating a client */}
      {selectedClient && (
        <ClientUpdateModal
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default ClientList;
