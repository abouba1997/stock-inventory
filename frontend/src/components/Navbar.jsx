import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { toast } from "react-toastify";

const Navbar = () => {
  const { logoutUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    toast.success("Déconnexion effectuée avec succès");
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 xl:px-0">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-lg md:text-xl lg:text-2xl font-semibold whitespace-nowrap">
            Nom de l&apos;Entreprise
          </span>
        </Link>
        {user && (
          <span>
            Bienvenue <span>{user.fullName}</span>
          </span>
        )}
        <ul className="flex flex-col items-center p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          {user ? (
            <li className="flex">
              <Link
                to="/menu"
                className="bg-slate-600 mr-2 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
              >
                <span>Menu</span>
                <CiViewList className="ml-2" size={24} />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
              >
                <span>Se déconnecter</span>
                <FiLogOut className="ml-2" size={24} />
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-slate-600 flex py-2 px-3 text-white rounded hover:bg-slate-700 md:hover:text-slate-50 transition-all duration-300"
              >
                <span>Se connecter</span>
                <FiLogIn className="ml-2" size={24} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
