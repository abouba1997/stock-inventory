import { Link } from "react-router-dom";
import HomePageIMG from "../assets/gestionnaire-stock.png";

const Home = () => {
  return (
    <div className="flex-grow flex items-center justify-center flex-col w-full">
      <div className="container mx-auto my-auto flex justify-center items-center flex-col lg:flex-row h-full">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              className="w-72 lg:w-full h-auto lg:max-w-md mx-auto mb-4 lg:mb-0"
              src={HomePageIMG}
              alt="Stock Management System"
            />
          </div>
          <div className="lg:w-1/3 text-center text-base sm:text-xl pl-2 pr-2 lg:pl-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 lg:mb-10">
              Bienvenue dans notre système de gestion des stocks.
            </h1>
            <p className="mb-4">
              Plongez dans une gestion de stocks simplifiée et efficace avec
              notre plateforme intuitive. Optimisez votre inventaire, suivez les
              mouvements des stocks, gérez les commandes et maximisez
              l&apos;efficacité opérationnelle.
            </p>
            <p>
              Notre solution offre une visibilité complète sur vos articles,
              permettant une gestion proactive des approvisionnements et une
              optimisation des performances. Simplifiez votre processus de
              gestion des stocks dès aujourd&apos;hui pour des opérations plus
              fluides et une croissance accrue de votre entreprise.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 text-center py-4 w-full mt-auto flex items-center justify-center">
        <p className="italic text-base">
          &copy; 2023 Votre entreprise. Tous droits réservés.
        </p>
        <p className="pl-5 italic text-sm">
          Designed by:
          <Link className="ml-2 font-semibold text-slate-500 hover:text-slate-700 transition-all duration-300">
            Sangtech
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
