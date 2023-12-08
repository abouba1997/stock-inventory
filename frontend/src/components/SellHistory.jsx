import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellHistory = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sales");
        setSales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSales();
  }, []);

  const handleSearchChange = async (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    try {
      const response = await axios.get("http://localhost:5000/sales");
      const allSales = response.data;

      console.log(allSales);

      if (searchText === "") {
        setSales(allSales);
      } else {
        // Filter sales based on the search text
        const filteredSales = allSales.filter((sale) =>
          sale.id.toString().toLowerCase().includes(searchText)
        );
        setSales(filteredSales);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (sale_id) => {
    navigate(`/sell-history/${sale_id}`);
  };

  return (
    <>
      <div className="container mx-auto pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold col-span-full">
            L&apos;historique des ventes
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
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="Recherche par vente ID..."
              value={searchText}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
        </div>
        <table className="border-collapse w-full">
          <thead>
            <tr className="border-t">
              <th className="p-2">Date</th>
              <th className="p-2">Vente ID</th>
              <th className="p-2">Montant total</th>
              <th className="p-2">Montant recu</th>
              <th className="p-2">Montant retourner</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              const inputDate = new Date(sale.sale_date);
              const formattedHours = format(inputDate, "HH:mm");
              const formattedDate = format(inputDate, "dd/MM/yyyy");
              return (
                <tr
                  key={sale.id}
                  className="border-t cursor-pointer hover:bg-slate-400"
                  onClick={() => handleRowClick(sale.id)}
                >
                  <td className="p-2 text-center italic font-semibold">
                    <span className="mr-2">{formattedDate}</span>
                    <span>{formattedHours}</span>
                  </td>
                  <td className="p-2 text-center">{sale.id}</td>
                  <td className="p-2 text-center">
                    {parseFloat(sale.total_price).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="p-2 text-center">
                    {parseFloat(sale.received_amount).toLocaleString("fr-FR")}{" "}
                    FCFA
                  </td>
                  <td className="p-2 text-center">
                    {parseFloat(sale.returned_amount).toLocaleString("fr-FR")}{" "}
                    FCFA
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellHistory;
