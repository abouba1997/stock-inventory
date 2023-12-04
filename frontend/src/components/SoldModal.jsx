import axios from "axios";
import { useEffect, useState } from "react";
import { BsDoorClosed } from "react-icons/bs";

/* eslint-disable react/prop-types */
const SoldModal = ({
  productsInList,
  totalAmount,
  client_id,
  paymentMethod,
  formattedTime,
  onClose,
  dateContent,
  modalOpen,
}) => {
  const [client, setClient] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/clients/${client_id}`
        );
        setClient(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClient();
  }, [client_id, client]);

  return (
    <>
      {modalOpen && (
        <div className="absolute w-full bg-black/50 h-screen flex items-center justify-center">
          <div className="bg-white max-w-screen-sm p-4 rounded-md relative">
            <span className="absolute top-4 right-3" onClick={onClose}>
              <BsDoorClosed size={24} />
            </span>
            <p className="pt-2 font-semibold mb-4 flex flex-col">
              <span>
                Date:{" "}
                <span className="italic text-base mb-1 font-normal">
                  {dateContent}
                </span>
              </span>
              <span>
                Heure:{" "}
                <span className="italic text-base font-normal">
                  {formattedTime}
                </span>
              </span>
            </p>
            <p className="flex flex-col justify-between mb-4">
              <span className="">Client: {client.client_name}</span>
              <span>Methode de paiement: {paymentMethod}</span>
            </p>
            <h2>Produits</h2>
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Qtite</th>
                  <th>Prix</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productsInList.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unit_price}</td>
                    <td>
                      {(
                        parseFloat(product.quantity) *
                        parseFloat(product.unit_price)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex flex-col items-center justify-between border-y-2 border-slate-400 py-3">
              <p>
                Montant HT:{" "}
                <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
                  5000 FCFA
                </span>
              </p>
              <p>
                Montant TVA:{" "}
                <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
                  6000 FCFA
                </span>
              </p>
              <p>
                Montant HTC:{" "}
                <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
                  {totalAmount && totalAmount.toLocaleString("fr-FR")} FCFA
                </span>
              </p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <button className="py-1 px-2 bg-slate-400 font-semibold italic rounded-md">
                Enregistrer
              </button>
              <button className="py-1 px-2 bg-slate-400 font-semibold italic rounded-md">
                Imprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SoldModal;
