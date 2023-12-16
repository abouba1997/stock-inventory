import { MdClose } from "react-icons/md";
import ReactToPrint from "react-to-print";
import HomePageIMG from "../assets/gestionnaire-stock.png";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";

/* eslint-disable react/prop-types */
const SoldModal = ({
  productsInList,
  totalAmount,
  client_name,
  paymentMethod,
  formattedTime,
  onClose,
  dateContent,
  modalOpen,
  sale_id,
}) => {
  let componentRef = useRef();
  const { user } = useAuth();

  return (
    <>
      {modalOpen && (
        <div className="absolute w-full bg-black/50 h-full flex items-center justify-center cursor-pointer">
          <div className="bg-white max-w-screen-sm p-4 rounded-md relative cursor-auto h-full mx-8 overflow-auto">
            <span
              className="absolute top-1 right-1 cursor-pointer"
              onClick={onClose}
            >
              <MdClose size={24} />
            </span>
            <div ref={(el) => (componentRef = el)} className="p-4">
              <p className="flex justify-center items-center flex-col">
                <span className="text-2xl font-semibold">
                  Nom de l&apos;entreprise
                </span>
                <span className="font-semibold">
                  Adresse:{" "}
                  <span className="font-normal italic">Kalaban Coura</span>
                </span>
                <span className="font-semibold">
                  Tel:{" "}
                  <span className="font-normal italic">+223 77-77-77-77</span>
                </span>
                <img
                  className="w-32 h-32"
                  src={HomePageIMG}
                  alt="Logo de l'entreprise"
                />
              </p>
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
              <p className="flex flex-col justify-between mb-4 font-semibold">
                <span>
                  Client:{" "}
                  <span className="italic text-base font-normal">
                    {client_name}
                  </span>
                </span>
                <span>
                  Methode de paiement:{" "}
                  <span className="italic text-base font-normal">
                    {paymentMethod}
                  </span>
                </span>
                <span>
                  Vente ID:{" "}
                  <span className="italic text-base font-normal">
                    #{sale_id}
                  </span>
                </span>
              </p>
              <h2 className="text-lg font-medium border-b-2 border-slate-400 pb-2">
                Produits
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
              <div className="w-full flex flex-col justify-between border-y-2 border-slate-400 py-3">
                <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                  Montant HT:{" "}
                  <span className="ml-[19px] px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                    {(totalAmount / 1.2).toLocaleString("fr-FR")} FCFA
                  </span>
                </p>
                <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                  Montant TVA:{" "}
                  <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                    {((totalAmount * 0.2) / 1.2).toLocaleString("fr-FR")} FCFA
                  </span>
                </p>
                <p className="flex flex-row items-center justify-between whitespace-nowrap text-lg font-medium mb-1">
                  Montant HTC:{" "}
                  <span className="ml-2 px-2 py-1 bg-slate-300 rounded-md font-semibold text-lg">
                    {totalAmount && totalAmount.toLocaleString("fr-FR")} FCFA
                  </span>
                </p>
              </div>
              <div className="text-center mt-4 flex flex-col">
                <span className="text-sm italic font-medium">Marchant</span>
                <span className="text-sm italic">{user && user.fullName}</span>
              </div>
              <div className="text-center mt-2 flex flex-col">
                <span className="text-xs italic font-medium">
                  Vous remercie de votre visite
                </span>
              </div>
            </div>
            <ReactToPrint
              trigger={() => (
                <div className="flex flex-row justify-between mt-5">
                  <button className="py-1 px-2 bg-slate-400 font-semibold italic rounded-md">
                    Imprimer
                  </button>
                </div>
              )}
              content={() => componentRef}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SoldModal;
