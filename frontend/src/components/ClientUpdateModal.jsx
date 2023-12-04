/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const defaultFormData = {
  client_name: "",
  client_email: "",
  client_contact: "",
  client_address: "",
};

const ClientUpdateModal = ({ client, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...defaultFormData,
    client_name: client.client_name || "",
    client_email: client.client_email || "",
    client_contact: client.client_contact || "",
    client_address: client.client_address || "",
  });

  useEffect(() => {
    if (
      client &&
      client.client_name &&
      client.client_email &&
      client.client_address &&
      client.client_contact
    ) {
      setFormData({
        ...defaultFormData,
        client_name: client.client_name,
        client_email: client.client_email,
        client_contact: client.client_contact,
        client_address: client.client_address,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/clients/${client.id}`, formData);

      onUpdate();
      onClose();
      toast.success("Client mise à jour avec succès!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute left-[50%] translate-x-[-50%] w-full bg-black/60 pb-4 h-screen"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-md mx-auto py-4 px-10 rounded-md relative translate-y-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="cursor-pointer p-2 absolute right-0 top-0"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </span>
        <h2 className="text-lg text-center font-semibold pb-2">
          Mettre à jour le client {client.client_name}{" "}
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

export default ClientUpdateModal;
