import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X, LogOut, Heart, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

import { useCart } from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

import logo from "../assets/shop.svg";
import { styles } from "../utils/styles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItemCount } = useCart();
  const { iconButton, authButton, logoutButton, mobileNavLink } = styles;

  // Authentication
  const { isAuthenticated, logout } = useAuth();

  // =========================================
  // SCROLL HANDLER
  // =========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================
  // CLOSE MOBILE MENU
  // =========================================

  const closeMenu = () => {
    setIsOpen(false);
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // =========================================
  // DESKTOP NAV LINK STYLE
  // =========================================

  const navLinkClass = ({ isActive }) =>
    `
      relative
      px-3
      py-2
      text-sm
      font-medium
      transition-colors
      duration-200

      ${isActive ? "text-blue-700" : "text-gray-600 hover:text-gray-900"}

      after:absolute
      after:left-3
      after:right-3
      after:bottom-0
      after:h-px
      after:bg-blue-700
      after:origin-center
      after:transition-transform
      after:duration-200

      ${
        isActive
          ? "after:scale-x-100"
          : "after:scale-x-0 hover:after:scale-x-100"
      }
    `;

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <nav
        className="
          relative
          mx-auto
          max-w-4xl
          rounded-4xl
          border
          border-gray-200/60
          bg-white/65
          backdrop-blur-xl
          backdrop-saturate-150
          transition-all
          duration-300
          shadow-[0_8px_30px_rgba(0,0,0,0.10)]
        "
      >
        {/* =========================================
            NAVBAR MAIN CONTAINER
        ========================================= */}

        <div className="relative flex h-16 items-center px-4 sm:px-5">
          {/* =========================================
              LEFT NAVIGATION
          ========================================= */}

          <div className="hidden md:flex items-center gap-1">
            {/* Home */}

            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            {/* Products */}

            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
          </div>

          {/* =========================================
              CENTER LOGO
          ========================================= */}

          <Link
            to="/"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              flex
              items-center
            "
          >
            <img src={logo} alt="ShopStore" className="h-11 w-auto" />
          </Link>

          {/* =========================================
              RIGHT NAVIGATION
          ========================================= */}

          <div className="ml-auto hidden md:flex items-center gap-1">
            {/* =====================================
                AUTHENTICATED USER
            ===================================== */}

            {isAuthenticated ? (
              <>
                {/* =================================
                    WISHLIST
                ================================= */}

                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  title="Wishlist"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-gray-600
                    transition-all
                    duration-200
                    hover:bg-black/5
                    hover:text-gray-900
                  "
                >
                  <Heart size={18} strokeWidth={1.6} />
                </Link>

                {/* =================================
                    ADDRESSES
                ================================= */}

                <Link
                  to="/address"
                  aria-label="Addresses"
                  title="Addresses"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-gray-600
                    transition-all
                    duration-200
                    hover:bg-black/5
                    hover:text-gray-900
                  "
                >
                  <MapPin size={18} strokeWidth={1.6} />
                </Link>

                {/* =================================
                    LOGOUT
                ================================= */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className={logoutButton}
                >
                  <LogOut size={16} strokeWidth={1.6} />
                  Logout
                </button>
              </>
            ) : (
              /* =====================================
                 LOGGED OUT
              ===================================== */

              <>
                {/* Login */}

                <Link to="/login" className={authButton}>
                  Login
                </Link>

                {/* Register */}

                <Link to="/register" className={authButton}>
                  Register
                </Link>
              </>
            )}

            {/* =====================================
                CART
            ===================================== */}

            <Link
              to="/cart"
              aria-label="Cart"
              title="Cart"
              className="
                relative
                ml-1
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-gray-600
                transition-all
                duration-200
                hover:bg-black/5
                hover:text-gray-900
              "
            >
              <ShoppingBag size={18} strokeWidth={1.6} />

              {/* Cart Item Count */}

              {cartItemCount > 0 && (
                <span
                  className="
                    absolute
                    right-0.5
                    top-0.5
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-700
                    px-1
                    text-[9px]
                    font-semibold
                    text-white
                  "
                >
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* =========================================
              MOBILE ACTIONS
          ========================================= */}

          <div className="ml-auto flex items-center md:hidden">
            {/* =====================================
                MOBILE CART
            ===================================== */}

            <Link
              to="/cart"
              aria-label="Cart"
              title="Cart"
              className="
                relative
                mr-1
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-gray-600
                transition
                hover:bg-black/5
              "
            >
              <ShoppingBag size={18} strokeWidth={1.6} />

              {/* Cart Item Count */}

              {cartItemCount > 0 && (
                <span
                  className="
                    absolute
                    right-0.5
                    top-0.5
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-700
                    px-1
                    text-[9px]
                    font-semibold
                    text-white
                  "
                >
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* =====================================
                MOBILE MENU BUTTON
            ===================================== */}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className={iconButton}
            >
              {isOpen ? (
                <X size={20} strokeWidth={1.6} />
              ) : (
                <Menu size={20} strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        {/* =========================================
            MOBILE NAVIGATION
        ========================================= */}

        {isOpen && (
          <div
            className="
              border-t
              border-gray-200/60
              px-4
              py-3
              md:hidden
            "
          >
            <div className="flex flex-col">
              {/* =================================
                  HOME
              ================================= */}

              <NavLink to="/" end onClick={closeMenu} className={mobileNavLink}>
                Home
              </NavLink>

              {/* =================================
                  PRODUCTS
              ================================= */}

              <NavLink
                to="/products"
                onClick={closeMenu}
                className={mobileNavLink}
              >
                Products
              </NavLink>

              {/* =================================
                  AUTHENTICATED USER OPTIONS
              ================================= */}

              {isAuthenticated && (
                <>
                  {/* Divider */}

                  <div className="my-2 border-t border-gray-200/60" />

                  {/* =================================
                      WISHLIST
                  ================================= */}

                  <NavLink
                    to="/wishlist"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      px-3
                      py-3
                      text-sm
                      font-medium
                      text-gray-600
                      transition
                      hover:bg-black/5
                      hover:text-gray-900
                    "
                  >
                    <Heart size={17} strokeWidth={1.6} />
                    Wishlist
                  </NavLink>

                  {/* =================================
                      ADDRESSES
                  ================================= */}

                  <NavLink
                    to="/addresses"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      px-3
                      py-3
                      text-sm
                      font-medium
                      text-gray-600
                      transition
                      hover:bg-black/5
                      hover:text-gray-900
                    "
                  >
                    <MapPin size={17} strokeWidth={1.6} />
                    Addresses
                  </NavLink>
                </>
              )}

              {/* =================================
                  DIVIDER
              ================================= */}

              <div className="my-2 border-t border-gray-200/60" />

              {/* =================================
                  AUTHENTICATED MOBILE MENU
              ================================= */}

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <LogOut size={16} strokeWidth={1.6} />
                  Logout
                </button>
              ) : (
                /* =====================================
                   LOGGED OUT MOBILE MENU
                ===================================== */

                <>
                  {/* Login */}

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={mobileNavLink}
                  >
                    Login
                  </Link>

                  {/* Register */}

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={mobileNavLink}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
