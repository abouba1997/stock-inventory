import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";

const SupplierDetails = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suppliers/${supplierId}`
        );
        setSupplier(response.data);

        // Fetch category products based on suppliers_id
        const productLists = await axios.get(
          `http://localhost:5000/products/supplier/${supplierId}`
        );
        setProducts(productLists.data);
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de l'opération");
      }
    };

    fetchSupplier();
  }, [supplierId]);

  if (!supplier) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <Circles
          height="80"
          width="80"
          color="#1f2937"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 pt-6 flex flex-row max-w-screen-xl gap-8">
        <div className="w-1/3">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
            <img
              src={`http://localhost:5000/${supplier.imagePath}`}
              alt={supplier.supplier_name}
              className="w-full h-48 object-cover sm:h-64 md:h-72"
            />
            <div className="p-3">
              <h2 className="text-2xl font-bold mb-4">
                {supplier.supplier_name}
              </h2>
              <p className="text-lg mb-4">
                Email:{" "}
                <span className="font-bold">{supplier.supplier_email}</span>
              </p>
              <p className="text-lg mb-4">
                Contact:{" "}
                <span className="font-bold">{supplier.supplier_contact}</span>
              </p>
              <p className="mb-4">
                <span className="text-lg">Addresse: </span>
                <span className="text-base font-bold">
                  {supplier.supplier_address}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/suppliers-list"
              className="py-2 px-4 bg-blue-400 rounded-md hover:bg-blue-600 text-white transition-all duration-300"
            >
              Retourner à la liste des fournisseurs
            </Link>
          </div>
        </div>
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-4">
            Liste des produits fournis par le fournisseur:
            <span className="font-bold underline ml-2">
              {supplier.supplier_name}
            </span>
          </h2>
          <table className="border-collapse w-full">
            <thead>
              <tr className="border-t">
                <th className="p-2">Image du produit</th>
                <th className="p-2">Nom du produit</th>
                <th className="p-2">Prix Unitaire du produit</th>
                <th className="p-2">Quantité en stock</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SupplierDetails;
