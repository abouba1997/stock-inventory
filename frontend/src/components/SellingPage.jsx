import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";
import HomePageIMG from "../assets/gestionnaire-stock.png";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import SoldModal from "./SoldModal";

const initialState = {
  product_id: "",
  product_name: "",
  quantity: 1,
  tva: "20",
  discount: "0",
  unit_price: 0,
};

const initialSaleData = {
  client_id: "",
  payment_method: "",
  total_price: "",
  received_amount: "",
  returned_amount: "",
  user_id: "",
};

const SellingPage = () => {
  const { user } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [productsInList, setProductsInList] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [saleData, setSaleData] = useState(initialSaleData);
  const [totalAmount, setTotalAmount] = useState(0);
  const [saleId, setSaleId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProductsList(response.data);
        setAvailableProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clients");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/payment_methods"
        );
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();

    fetchProducts();

    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      productsInList.forEach((product) => {
        total += parseInt(product.quantity) * parseFloat(product.unit_price);
      });
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [productsInList]);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "product_id") {
      const selectedProduct = productsList.find(
        (product) => product.id === parseInt(value)
      );

      if (selectedProduct) {
        // Update form data with selected product details
        setFormData({
          ...formData,
          [name]: value,
          product_name: selectedProduct.product_name,
          unit_price: selectedProduct.price,
        });

        // Set the remaining stock quantity
        const stock = selectedProduct.quantity_on_hand || 0;
        setStock(stock);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaleChange = (e) => {
    if (e.target.name === "received_amount") {
      const received_amount = parseFloat(e.target.value);
      const total_price = parseFloat(totalAmount);

      setSaleData((prevSaleData) => ({
        ...prevSaleData,
        total_price: total_price.toString(),
        received_amount: received_amount.toString(),
        returned_amount: (received_amount - total_price).toString(),
      }));
    } else {
      setSaleData({ ...saleData, [e.target.name]: e.target.value });
    }
  };

  const submitAddingProduct = () => {
    const { product_id } = formData;

    const selectedProduct = productsList.find(
      (product) => product.id === parseInt(product_id)
    );

    if (selectedProduct) {
      const updateFormData = {
        ...formData,
        product_name: selectedProduct.product_name,
        unit_price: selectedProduct.price,
      };

      // Ensure quantity is converted to a number
      const parsedQuantity = parseInt(formData.quantity) || 1; // Default to 1 if quantity is not a valid number
      updateFormData.quantity = parsedQuantity;

      setProductsInList((prevData) => [updateFormData, ...prevData]);
      setFormData(initialState);

      // Update the available products based on the remaining products
      const remainingProducts = availableProducts.filter(
        (product) => product.id !== parseInt(product_id)
      );
      setAvailableProducts(remainingProducts);
    }
  };

  const handleDelete = (productId, e) => {
    e.stopPropagation();
    const updatedProductsList = productsInList.filter(
      (product) => product.product_id !== productId
    );

    // Find the deleted product from productsList
    const deletedProduct = productsList.find(
      (product) => product.id === parseInt(productId)
    );

    if (deletedProduct) {
      // Update the state with the modified products list
      setProductsInList(updatedProductsList);

      // Add the deleted product back to availableProducts
      setAvailableProducts((prevAvailableProducts) => [
        deletedProduct,
        ...prevAvailableProducts,
      ]);
    }
  };

  const plusQtityProduct = (product_id) => {
    const updatedProductsList = productsInList.map((product) => {
      if (product.product_id === product_id) {
        return {
          ...product,
          quantity:
            parseInt(product.quantity) >= 1
              ? parseInt(product.quantity) + 1
              : 1,
        };
      }
      return product;
    });

    // Update the state with the modified products list
    setProductsInList(updatedProductsList);
  };

  const minusQtityProduct = (product_id) => {
    const updatedProductsList = productsInList.map((product) => {
      if (product.product_id === product_id) {
        return {
          ...product,
          quantity:
            parseInt(product.quantity) > 1 ? parseInt(product.quantity) - 1 : 1,
        };
      }
      return product;
    });
    // Update the state with the modified products list
    setProductsInList(updatedProductsList);
  };

  const onClose = () => {
    setModalOpen(false);
    setProductsInList([]);
    setSaleData(initialSaleData);
    setAvailableProducts(productsList);
  };

  const formattedDay = format(currentDateTime, "EEEE", { locale: fr });
  const formattedDDay = format(currentDateTime, "d", { locale: fr });
  const formattedMonth = format(currentDateTime, "MMMM", { locale: fr });
  const formattedYear = format(currentDateTime, "yyyy", { locale: fr });
  const formattedTime = format(currentDateTime, "HH:mm");

  const dateContent = (
    <>
      <span className="capitalize">{formattedDay}</span>, le {formattedDDay}{" "}
      <span className="capitalize">
        {formattedMonth} {formattedYear}
      </span>
    </>
  );

  const validateSelling = async () => {
    const foundClient = clients.find(
      (client) => client.id === parseInt(saleData.client_id)
    );

    const found_payment_method = paymentMethods.find(
      (method) => method.id === parseInt(saleData.payment_method)
    );

    if (foundClient) {
      setClientName(foundClient.client_name);
    } else {
      toast.error("Veuillez choisir un client");
      return;
    }

    if (found_payment_method) {
      setPaymentMethodName(found_payment_method.method_name);
    } else {
      toast.error("Veuillez choisir le type de paiement");
      return;
    }

    if (productsInList.length <= 0) {
      toast.error("Veuillez selectionner au moins un produit");
      return;
    }

    if (!saleData.received_amount || isNaN(saleData.received_amount)) {
      toast.error("Veuillez entrer le montant recu");
      return;
    }

    await axios
      .post("http://localhost:5000/sales/save-sales", {
        salesData: { ...saleData, total_price: totalAmount, user_id: user.id },
        salesItemsData: productsInList,
      })
      .then((response) => {
        toast.success(response.data.msg);
        setSaleId(response.data.sale_id);
        if (response.data.sale_id) {
          setModalOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      });
  };

  const cancelSelling = () => {
    setProductsInList([]);
    setAvailableProducts(productsList);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="w-full mx-auto p-4 xl:px-10">
          <div className="mx-auto">
            <div className="flex items-center justify-between border-b-2 border-gray-900">
              <img
                className="w-24 h-24"
                src={HomePageIMG}
                alt="Logo de l'entreprise"
              />
              <div className="flex">
                <p className="flex flex-row py-4 text-xl w-1/5 items-center">
                  <span className="font-semibold mr-4">Utilisateur:</span>
                  <span className="flex flex-col text-base text-center text-gray-900 italic">
                    <span>{user && user.fullName}</span>
                    <span>{user && user.email}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between text-base border-b-2 py-1 border-gray-900 lg:flex-row">
              <div className="flex justify-between lg:flex-col mb-2 lg:mb-0">
                <p>
                  Date:{" "}
                  <span className="text-slate-800 font-medium">
                    {dateContent}
                  </span>
                </p>
                <p>
                  Heure:{" "}
                  <span className="text-slate-800 font-medium">
                    {formattedTime}
                  </span>
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex items-center">
                  <label htmlFor="client_id">Client:</label>
                  <select
                    id="client_id"
                    name="client_id"
                    value={saleData.client_id}
                    onChange={handleSaleChange}
                    required
                    className="ml-2 mr-4 bg-slate-300 w-full px-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                  >
                    <option id="" value="">
                      Selectionner un client
                    </option>
                    {clients.map((client) => (
                      <option key={client.id} id={client.id} value={client.id}>
                        {client.client_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="payment_method" className="whitespace-nowrap">
                    Mode de paiement:
                  </label>
                  <select
                    id="payment_method"
                    name="payment_method"
                    value={saleData.payment_method}
                    onChange={handleSaleChange}
                    className="ml-2 bg-slate-200 w-full py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                  >
                    <option id="" value="">
                      Selectionner un mode de paiement
                    </option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} id={method.id} value={method.id}>
                        {method.method_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Selection du produit */}
            <div className="py-2 w-full flex flex-col border-b-2 border-gray-800">
              <div className="flex flex-col xl:flex-row">
                <div className="flex justify-between mb-2 xl:mb-0">
                  <div className="flex items-center mr-0 xl:mr-5">
                    <label htmlFor="produit_id">Produit:</label>
                    <select
                      id="produit_id"
                      name="product_id"
                      value={formData.product_id}
                      onChange={handleChange}
                      className="ml-2 mr-4 bg-slate-300 w-full px-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    >
                      <option id="" value="">
                        Selectionner un produit
                      </option>
                      {availableProducts.map((product) => (
                        <option
                          key={product.id}
                          id={product.id}
                          value={product.id}
                        >
                          {product.product_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center mr-0 xl:mr-5">
                    <label htmlFor="quantity">Qtite du produit:</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min={1}
                      className="border rounded px-2 py-1 ml-2 w-20 text-center"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center mr-5">
                    <label htmlFor="tva">TVA du produit:</label>
                    <input
                      type="text"
                      name="tva"
                      value={formData.tva}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 ml-2 mr-4 w-20 text-center text-slate-400 focus:text-black"
                    />
                  </div>
                  <div className="flex items-center mr-5">
                    <label htmlFor="discount">Remise:</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      placeholder="Remise"
                      value={formData.discount}
                      onChange={handleChange}
                      min="1"
                      className="border rounded px-2 py-1 ml-2 mr-4 w-32 text-center text-slate-400 focus:text-black"
                    />
                  </div>
                  <div className="flex items-center mr-5">
                    <label htmlFor="stock">Stock:</label>
                    <input
                      type="text"
                      id="stock"
                      name="stock"
                      value={stock}
                      readOnly
                      className={`border rounded px-2 py-1 ml-2 mr-4 w-20 text-center font-semibold ${
                        stock !== 0 && parseInt(stock) <= 5
                          ? "bg-red-600 text-white"
                          : "bg-slate-300"
                      } focus:outline-none`}
                    />
                  </div>
                  <div className="flex items-center mr-0 xl:mr-5">
                    <button
                      onClick={submitAddingProduct}
                      className="bg-slate-600 hover:bg-slate-700 transition-all duration-300 rounded-sm text-white px-3 py-1"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des produits selectionnees */}
            <table className="border-collapse w-full">
              <thead>
                <tr className="border-b-2 border-gray-700">
                  <th className="p-2 border-r-2 border-gray-600">
                    Nom du produit
                  </th>
                  <th className="p-2 border-r-2 border-gray-600 w-40">Qtite</th>
                  <th className="p-2 border-r-2 border-gray-600 w-40">
                    Prix Unitaire
                  </th>
                  <th className="p-2 border-r-2 border-gray-600 w-40">
                    Prix Total
                  </th>
                  <th className="p-2 border-r-2 border-gray-600 w-40">
                    Remise
                  </th>
                  <th className="p-2 w-32">Action</th>
                </tr>
              </thead>
            </table>
            <div className="h-96 overflow-y-auto">
              <table className="w-full table-fixed">
                <tbody>
                  {productsInList.map((product) => (
                    <tr
                      key={product.product_id}
                      className="border-y-2 cursor-pointer hover:bg-slate-200 h-16 overflow-scroll"
                    >
                      <td className="p-2 text-center">
                        {product.product_name}
                      </td>
                      <td className="p-2 w-40 text-center">
                        <div className="flex items-center justify-center">
                          <LuPlusCircle
                            size={20}
                            className="mr-3"
                            onClick={() => plusQtityProduct(product.product_id)}
                          />
                          <div className="text-white py-1 px-3 rounded-md bg-black/60 font-semibold">
                            {product.quantity}
                          </div>
                          <LuMinusCircle
                            size={20}
                            className="ml-3"
                            onClick={() =>
                              minusQtityProduct(product.product_id)
                            }
                          />
                        </div>
                      </td>
                      <td className="p-2 text-center w-40">
                        {product.unit_price}
                      </td>
                      <td className="p-2 text-center w-40">
                        {parseFloat(product.quantity) * product.unit_price}
                      </td>
                      <td className="p-2 text-center w-40">
                        {product.discount}
                      </td>
                      <td className="p-2 text-center w-32">
                        <button
                          className="px-1 py-1 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={(e) => handleDelete(product.product_id, e)}
                        >
                          <BsTrash
                            size={24}
                            title="Supprimer ce produit de la liste"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Stock and Amount Details */}
      <div className="flex flex-col w-full mt-auto p-4 xl:px-10">
        <div className="w-full flex items-center justify-between border-y-2 border-slate-400 py-3">
          <p>
            Montant HT:{" "}
            <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
              {(totalAmount / 1.2).toLocaleString("fr-FR")} FCFA
            </span>
          </p>
          <p>
            Montant TVA:{" "}
            <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
              {((totalAmount * 0.2) / 1.2).toLocaleString("fr-FR")} FCFA
            </span>
          </p>
          <p>
            Montant HTC:{" "}
            <span className="ml-2 px-2 py-2 bg-slate-300 rounded-md font-semibold text-lg">
              {totalAmount.toLocaleString("fr-FR")} FCFA
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center py-2">
          <p className="relative">
            <label htmlFor="received_amount">Montant reçu: </label>
            <input
              type="text"
              name="received_amount"
              id="received_amount"
              onChange={handleSaleChange}
              value={
                isNaN(saleData.received_amount) ? 0 : saleData.received_amount
              }
              className="ml-2 px-2 py-1 border-2 rounded-md border-slate-400"
            />
            <span className="absolute right-8 top-[6px]">FCFA</span>
          </p>
          <p>
            <label htmlFor="returned_amount">Montant à retourner: </label>
            <input
              type="text"
              name="returned_amount"
              id="returned_amount"
              onChange={handleSaleChange}
              value={
                isNaN(saleData.returned_amount) ? 0 : saleData.returned_amount
              }
              className="ml-2 px-2 py-1 border-2 rounded-md border-slate-400"
            />
          </p>
          <div>
            <button
              className="py-2 px-4 bg-slate-500 rounded-md hover:bg-slate-600 transition-all text-white mr-4"
              onClick={validateSelling}
            >
              Valider l&apos;achat
            </button>
            <button
              className="py-2 px-4 bg-red-500 rounded-md hover:bg-red-600 transition-all text-white"
              onClick={cancelSelling}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      {productsInList.length > 0 && totalAmount && (
        <SoldModal
          productsInList={productsInList}
          totalAmount={totalAmount}
          client_name={clientName}
          paymentMethod={paymentMethodName}
          dateContent={dateContent}
          formattedTime={formattedTime}
          onClose={onClose}
          modalOpen={modalOpen}
          sale_id={saleId}
        />
      )}
    </>
  );
};

export default SellingPage;
