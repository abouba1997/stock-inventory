import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaEnvelope } from "react-icons/fa";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, verifyEmail, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendEmailVerification = async () => {
      if (user?.emailToken) {
        setIsLoading(true);

        try {
          const response = await verifyEmail(user?.emailToken);
          console.log(response);
        } catch (error) {
          console.log(error);
        }

        setIsLoading(false);
      } else {
        navigate("/login");
      }
    };

    sendEmailVerification();
  }, [verifyEmail, user, navigate, updateUser]);

  return (
    <div>
      {isLoading ? (
        <span>Sending email to be verified</span>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full text-center">
            <div className="flex items-center justify-center w-full">
              <FaEnvelope className="text-6xl text-blue-500 mb-4" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Vérification de l&apos;email
            </h2>
            <p className="text-gray-700 mb-4">
              Un email de vérification a été envoyé à votre adresse. Veuillez
              vérifier votre boîte de réception et cliquer sur le lien de
              vérification pour activer votre compte.
            </p>
            <p className="text-gray-700">
              Si vous n&apos;avez pas reçu l&apos;email dans quelques minutes,
              vérifiez le dossier de courrier indésirable (spam).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
