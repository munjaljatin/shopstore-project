import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/shop.svg";

const Footer = () => {
  return (
    <footer className="mt-8 bg-gray-950 text-gray-400">
      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* =====================================
              BRAND
          ===================================== */}

          <div className="lg:pr-8">
            <Link to="/" className="inline-flex items-center">
              <img src={logo} alt="ShopStore" className="h-15 w-auto" />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
              Your destination for quality technology, smart devices, and
              everyday accessories — thoughtfully selected for modern life.
            </p>

            {/* Social Links */}

            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-400
                  transition-all
                  duration-200
                  hover:border-blue-500/30
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaFacebook size={15} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-400
                  transition-all
                  duration-200
                  hover:border-blue-500/30
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-400
                  transition-all
                  duration-200
                  hover:border-blue-500/30
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaLinkedin size={15} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-400
                  transition-all
                  duration-200
                  hover:border-blue-500/30
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* =====================================
              QUICK LINKS
          ===================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">Shop</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================
              SUPPORT
          ===================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/returns"
                  className="
                    text-sm
                    text-gray-500
                    transition-colors
                    hover:text-white
                  "
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================
              CONTACT
          ===================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>

            <div className="mt-5 space-y-4">
              {/* Email */}

              <div className="flex items-start gap-3">
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/5
                    text-blue-400
                  "
                >
                  <Mail size={15} strokeWidth={1.6} />
                </div>

                <div>
                  <p className="text-xs text-gray-600">Email</p>

                  <span className="text-sm text-gray-400">
                    support@ecomstore.com
                  </span>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-start gap-3">
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/5
                    text-blue-400
                  "
                >
                  <Phone size={15} strokeWidth={1.6} />
                </div>

                <div>
                  <p className="text-xs text-gray-600">Phone</p>

                  <span className="text-sm text-gray-400">+91 1234567890</span>
                </div>
              </div>

              {/* Location */}

              <div className="flex items-start gap-3">
                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/5
                    text-blue-400
                  "
                >
                  <MapPin size={15} strokeWidth={1.6} />
                </div>

                <div>
                  <p className="text-xs text-gray-600">Location</p>

                  <span className="text-sm text-gray-400">
                    New Delhi, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            NEWSLETTER / CTA
        ========================================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-5
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div>
            <p className="text-sm font-medium text-white">Stay in the loop</p>

            <p className="mt-1 text-xs text-gray-500">
              Discover new products and latest offers.
            </p>
          </div>

          <Link
            to="/products"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-gray-900
              transition-all
              hover:bg-gray-100
            "
          >
            Explore products
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="border-t border-white/10">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-4
            px-5
            py-5
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p className="text-xs text-gray-600">
            © 2026 ShopStore. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="
                text-xs
                text-gray-600
                transition-colors
                hover:text-gray-300
              "
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="
                text-xs
                text-gray-600
                transition-colors
                hover:text-gray-300
              "
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
