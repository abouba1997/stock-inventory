import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productId}`
        );
        setProduct(response.data);

        // Fetch category details based on category_id
        const categoryResponse = await axios.get(
          `http://localhost:5000/categories/${response.data.category_id}`
        );
        setCategory(categoryResponse.data.category_name);

        // Fetch supplier details based on category_id
        const supplierResponse = await axios.get(
          `http://localhost:5000/suppliers/${response.data.supplier_id}`
        );
        setSupplier(supplierResponse.data.supplier_name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
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
      <div className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
          <img
            src={`http://localhost:5000/${product.imagePath}`}
            alt={product.product_name}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
            <p className="text-lg mb-4">
              Prix: <span className="font-bold">{product.price} FCFA</span>
            </p>
            <p className="text-lg mb-4">
              Quantite en stock:{" "}
              <span className="font-bold">{product.quantity_on_hand}</span>
            </p>
            <p className="mb-4">
              <span className="text-lg">Description: </span>
              <span className="text-base font-bold">{product.description}</span>
            </p>
            <p className="mb-4">
              <span className="text-lg">Categorie: </span>
              <span className="text-base font-bold">{category}</span>
            </p>
            <p className="mb-4">
              <span className="text-lg">Fournisseur: </span>
              <span className="text-base font-bold">{supplier}</span>
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/products-list"
            className="py-2 px-4 bg-blue-400 rounded-md hover:bg-blue-600 text-white transition-all duration-300"
          >
            Liste des produits
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
