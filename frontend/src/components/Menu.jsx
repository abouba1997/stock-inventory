import { Link } from "react-router-dom";
import HomePageIMG from "../assets/gestionnaire-stock.png";

const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto my-auto overflow-auto">
      {/* Logo/Header */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-semibold italic mb-4">
          Bienvenue dans votre gestionnaire de Ventes
        </h1>
      </div>
      <div className="mb-4 flex items-center justify-center flex-col">
        <img src={HomePageIMG} alt="Logo" className="h-52" />
        <h1 className="text-2xl font-bold">Nom de votre entreprise</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col mr-auto leading-8 w-full mb-8">
        <Link
          to="/products-list"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Produits
        </Link>
        <Link
          to="/clients-list"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Clients
        </Link>
        <Link
          to="/category-list"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Catégories
        </Link>

        <Link
          to="/suppliers-list"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Fournisseurs
        </Link>
        <Link
          to="/sell-list"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Ventes
        </Link>
        <Link
          to="/sell-history"
          className="text-xl py-1 pl-2 border-b border-blue-600 bg-slate-300 mt-2 hover:bg-slate-400 transition-all duration-300 rounded-sm"
        >
          Historiques des Ventes
        </Link>
      </div>
    </div>
  );
};

export default Menu;
