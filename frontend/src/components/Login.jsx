import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LogoIMG from "../assets/gestionnaire-stock.png";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { registerUser, loginUser, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleSwitchLogin = () => {
    setIsLogin((prev) => !prev);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (isLogin) {
      try {
        await loginUser(formData.email, formData.password);
        navigate("/menu");
      } catch (error) {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          toast.error(error.msg);
        }
      }
    } else {
      try {
        const response = await registerUser(
          formData.fullName,
          formData.email,
          formData.password
        );
        toast.success(response.msg);
        setIsLogin(true);
      } catch (error) {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          toast.error(error.msg);
        }
      }
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-gray-100 lg:flex-row mx-4 md:mx-0">
      <div className="max-w-[25rem] lg:max-w-[40rem]">
        <img src={LogoIMG} alt="Image logo" />
      </div>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 border-b-4 text-center py-3 bg-slate-400 rounded-t-md text-gray-800">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-base mb-2 font-bold text-gray-700"
              >
                Prénom et Nom
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none border"
                placeholder="Entrez votre nom et prénom"
              />
              {errors && errors.fullName && (
                <span className="text-sm text-red-600">{errors.fullName}</span>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-base mb-2 font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none border"
              placeholder="Entrez votre email"
            />
            {errors && errors.email && (
              <span className="text-sm text-red-600">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-base mb-2 font-bold text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none border"
              placeholder="Entrez votre mot de passe"
            />
            {errors && errors.password && (
              <span className="text-sm text-red-600">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Vous n'avez pas de compte?" : "Avez-vous déjà un compte?"}
          <button
            className="ml-1 text-blue-500 focus:outline-none"
            onClick={handleSwitchLogin}
          >
            {isLogin ? "S'inscrire ici" : "Se connecter ici"}
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
