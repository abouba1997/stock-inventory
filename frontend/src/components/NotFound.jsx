import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center items-center mt-5 h-auto text-2xl">
      <FaExclamationTriangle size={"7em"} className="text-yellow-400" />
      <h1 className="font-semibold text-3xl italic mt-3">404</h1>
      <p className="leading-10 mt-3 italic">
        Désolé, cette page n&apos;existe pas.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 mt-6 rounded-md text-xl"
      >
        Rétournez en arrière
      </button>
    </div>
  );
};

export default NotFound;
