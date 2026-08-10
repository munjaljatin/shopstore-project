import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingBag,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const VendorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `flex items-center rounded-md text-sm font-medium transition-all duration-200 ${
      isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-2.5"
    } ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-60"
      } h-screen sticky top-0 shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div
        className={`h-20.5 shrink-0 border-b border-gray-100 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between px-5"
        }`}
      >
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Vendor Panel
            </h2>

            <p className="text-xs text-gray-500 mt-1">Manage your store</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={19} strokeWidth={1.8} />
          ) : (
            <PanelLeftClose size={19} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {!isCollapsed && (
          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>
        )}

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          className={navLinkClass}
          title={isCollapsed ? "Dashboard" : undefined}
        >
          <LayoutDashboard size={18} strokeWidth={1.8} />

          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        {/* My Products */}
        <NavLink
          to="/dashboard/products"
          end
          className={navLinkClass}
          title={isCollapsed ? "My Products" : undefined}
        >
          <Package size={18} strokeWidth={1.8} />

          {!isCollapsed && <span>My Products</span>}
        </NavLink>

        {/* Add Product */}
        <NavLink
          to="/dashboard/products/new"
          end
          className={navLinkClass}
          title={isCollapsed ? "Add Product" : undefined}
        >
          <PlusSquare size={18} strokeWidth={1.8} />

          {!isCollapsed && <span>Add Product</span>}
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          end
          className={navLinkClass}
          title={isCollapsed ? "Orders" : undefined}
        >
          <ShoppingBag size={18} strokeWidth={1.8} />

          {!isCollapsed && <span>Orders</span>}
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="shrink-0 p-3 border-t border-gray-100">
        <button
          type="button"
          onClick={logout}
          className={`flex items-center w-full rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ${
            isCollapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-2.5"
          }`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={18} strokeWidth={1.8} />

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default VendorSidebar;
