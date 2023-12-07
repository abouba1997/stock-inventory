/* eslint-disable react/prop-types */
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import HomePageIMG from "../assets/gestionnaire-stock.png";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

const SellHistoryPopup = () => {
  const { sale_id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [saleItems, setSaleItems] = useState([]);
  const [client, setClient] = useState([]);
  const [userSale, setUserSale] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/sales/${sale_id}`
        );
        setSale(response.data);

        const saleItemsResponse = await axios.get(
          `http://localhost:5000/sale_items/sale/${sale_id}`
        );
        setSaleItems(saleItemsResponse.data);

        const clientResponse = await axios.get(
          `http://localhost:5000/clients/${sale?.client_id}`
        );
        setClient(clientResponse.data);

        const userSaleResponse = await axios.get(
          `http://localhost:5000/users/${sale?.user_id}`
        );
        setUserSale(userSaleResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSale();
  }, [sale_id, sale]);

  let formattedHours;
  let formattedDate;

  if (sale?.sale_date) {
    const inputDate = new Date(sale?.sale_date);
    formattedHours = format(inputDate, "HH:mm");
    formattedDate = format(inputDate, "dd/MM/yyyy");
  }

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="absolute w-full bg-black/50 h-screen flex items-center justify-center cursor-pointer">
        <div className="bg-white max-w-screen-md p-4 rounded-md relative cursor-auto">
          {/* Sales information with date and others */}
          <div className="flex justify-between">
            <span className="text-xl italic">
              Historique pour la vente:{" "}
              <span className="text-white bg-slate-600 px-2 py-1 rounded-md">
                #{sale_id}
              </span>
            </span>
            <MdClose
              size={24}
              className="cursor-pointer"
              onClick={handleReturn}
            />
          </div>
          <div className="p-4">
            <p className="flex justify-center items-center flex-col">
              <span className="text-2xl font-semibold">
                Nom de l&apos;entreprise
              </span>
              <img
                className="w-32 h-32"
                src={HomePageIMG}
                alt="Logo de l'entreprise"
              />
            </p>
            <div className="flex justify-between items-center">
              <p className="pt-2 font-semibold mb-4 flex flex-col">
                <span>
                  Date:{" "}
                  <span className="italic text-base mb-1 font-normal">
                    {formattedDate}
                  </span>
                </span>
                <span>
                  Heure:{" "}
                  <span className="italic text-base font-normal">
                    {formattedHours}
                  </span>
                </span>
              </p>
              <p>
                <span className="pt-2 font-semibold">
                  Client:{" "}
                  <span className="italic text-base font-normal">
                    {client && client.client_name}
                  </span>
                </span>
              </p>
            </div>
            <h2 className="text-lg font-medium border-b-2 border-slate-400 pb-2">
              Produits vendus
            </h2>
            <table>
              <thead className="">
                <tr className="border-b-2 border-slate-400">
                  <th className="w-28 text-left mr-3">Produit</th>
                  <th className="w-28 text-left mr-3">Qtite</th>
                  <th className="w-28 text-left mr-3">Prix</th>
                  <th className="w-28 text-left mr-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {saleItems.map((saleItem, index) => (
                  <tr key={index}>
                    <td>{saleItem.product_name}</td>
                    <td>{saleItem.quantity}</td>
                    <td>{saleItem.unit_price}</td>
                    <td>{saleItem.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex flex-col justify-between border-y-2 border-slate-400 py-3">
              <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                Montant HT:{" "}
                <span className="ml-[19px] px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                  {sale && (sale.total_price / 1.2).toLocaleString("fr-FR")}{" "}
                  FCFA
                </span>
              </p>
              <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                Montant TVA:{" "}
                <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                  {sale &&
                    ((sale.total_price * 0.2) / 1.2).toLocaleString(
                      "fr-FR"
                    )}{" "}
                  FCFA
                </span>
              </p>
              <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1 pb-2">
                Montant HTC:{" "}
                <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                  {sale &&
                    sale.total_price &&
                    sale.total_price.toLocaleString("fr-FR")}{" "}
                  FCFA
                </span>
              </p>
              <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1 border-t-2 pt-2 border-slate-400">
                Montant reçu:{" "}
                <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                  {sale &&
                    sale.received_amount &&
                    sale.received_amount.toLocaleString("fr-FR")}{" "}
                  FCFA
                </span>
              </p>
              <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                Montant rendu:{" "}
                <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                  {sale &&
                    sale.returned_amount &&
                    sale.returned_amount.toLocaleString("fr-FR")}{" "}
                  FCFA
                </span>
              </p>
            </div>
            <div className="text-center mt-4 flex flex-col">
              <span className="text-sm italic font-medium">
                Marchant de la vente
              </span>
              <span className="text-sm italic">
                {userSale && userSale.fullName}
              </span>
            </div>
            <div className="text-center mt-2 flex flex-col">
              <span className="text-xs italic font-medium">
                Vous remercie de votre visite
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellHistoryPopup;
