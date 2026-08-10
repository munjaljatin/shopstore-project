import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import useAuth from "./hooks/useAuth.js";

const AppProviders = () => {
  const { user } = useAuth();

  return (
    <CartProvider key={user?.id ?? "guest"}>
      <App />
      <Toaster position="top-right" />
    </CartProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProviders />
  </AuthProvider>,
);
