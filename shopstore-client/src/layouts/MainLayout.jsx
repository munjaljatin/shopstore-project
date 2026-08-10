import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto pb-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
