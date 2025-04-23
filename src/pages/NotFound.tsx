import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 animate-bounce text-navy drop-shadow-lg">404</h1>
        <p className="text-xl text-gray-600 mb-4">¡Oops! Página no encontrada</p>
        <a href="/" className="inline-block px-6 py-2 rounded bg-navy text-white font-semibold shadow transition-all duration-200 hover:bg-gold hover:text-navy focus:bg-gold focus:text-navy">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
