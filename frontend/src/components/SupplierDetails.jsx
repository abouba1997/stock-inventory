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
        console.log(productLists.data);
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
      <div className="container mx-auto p-8 flex flex-row">
        <div className="w-1/2">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
            <img
              src={`http://localhost:5000/${supplier.imagePath}`}
              alt={supplier.supplier_name}
              className="w-full h-64 object-contain sm:h-80 md:h-96"
            />
            <div className="p-6">
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
              Retour a la Liste des fournisseurs
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold">
            Liste des Produits par le fournisseur
          </h2>
          {products.map((product) => (
            <span key={product.id}>{product.product_name}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SupplierDetails;
