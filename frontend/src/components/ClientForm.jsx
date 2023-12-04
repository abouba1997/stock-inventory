import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const initialState = {
  client_name: "",
  client_email: "",
  client_contact: "",
  client_address: "",
};

const ClientForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/clients/", formData);

      setFormData(initialState);

      toast.success("Client ajoutee avec succès!");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'opération");
    }
  };

  return (
    <>
      <div className="container mx-auto my-auto p-4">
        <div>
          <h2 className="text-2xl font-bold text-center mb-3">
            Ajout d&apos;un nouveau client
          </h2>
          <form onSubmit={handleSubmit} className="w-full md:max-w-md mx-auto">
            <div className="mb-3">
              <label
                htmlFor="client_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Nom du client
              </label>
              <input
                type="text"
                id="client_name"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez le nom du client"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="client_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email du client
              </label>
              <input
                type="email"
                id="client_email"
                name="client_email"
                value={formData.client_email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez l'email du client"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="client_contact"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact du client
              </label>
              <input
                type="text"
                id="client_contact"
                name="client_contact"
                value={formData.client_contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez le contact du client"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="client_address"
                className="block text-gray-700 font-bold mb-2"
              >
                L&apos;addresse du client
              </label>
              <input
                type="text"
                id="client_address"
                name="client_address"
                value={formData.client_address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Entrez l'addresse du client"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Ajouter le client
              </button>
              <Link
                to="/clients-list"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Retour liste des clients
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientForm;
