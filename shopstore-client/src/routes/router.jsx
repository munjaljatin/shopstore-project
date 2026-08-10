import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import Orders from "../pages/orders/Orders";
import Cart from "../pages/cart/Cart";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyProducts from "../pages/vendor/MyProducts";
import AddProduct from "../pages/vendor/AddProduct";
import EditProduct from "../pages/vendor/EditProduct";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import Address from "../pages/address/Address";
import AddressForm from "../pages/address/AddressForm";

// const router = createBrowserRouter([
//   // PUBLIC APPLICATION ROUTES
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "products",
//         element: <Products />,
//       },
//       {
//         path: "products/:id",
//         element: <ProductDetails />,
//       },
//       // PROTECTED USER ROUTES
//       {
//         path: "order",
//         element: (
//           <ProtectedRoute allowedRoles={["customer"]}>
//             <Orders />
//           </ProtectedRoute>
//         ),
//       },

//       {
//         path: "cart",
//         element: (
//           <ProtectedRoute allowedRoles={["customer"]}>
//             <Cart />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },

//   // AUTH ROUTES
//   {
//     path: "/login",
//     element: <Login />,
//   },

//   {
//     path: "/register",
//     element: <Register />,
//   },

//   // VENDOR DASHBOARD
//   {
//     path: "dashboard",
//     element: (
//       <ProtectedRoute allowedRoles={["vendor"]}>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <DashboardHome />,
//       },
//       {
//         path: "products",
//         element: <MyProducts />,
//       },
//       {
//         path: "products/new",
//         element: <AddProduct />,
//       },
//       {
//         path: "products/:id/edit",
//         element: <EditProduct />,
//       },
//     ],
//   },

//   // 404 Not Found
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/:id",
            element: <ProductDetails />,
          },
          {
            path: "order",
            element: (
              <ProtectedRoute allowedRoles={["customer"]}>
                <Orders />
              </ProtectedRoute>
            ),
          },
          {
            path: "cart",
            element: (
              <ProtectedRoute allowedRoles={["customer"]}>
                <Cart />
              </ProtectedRoute>
            ),
          },
          {
            path: "/address",
            element: (
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            ),
          },
          {
            path: "/address/new",
            element: (
              <ProtectedRoute>
                <AddressForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "/address/:id/edit",
            element: (
              <ProtectedRoute>
                <AddressForm />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["vendor"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "products",
            element: <MyProducts />,
          },
          {
            path: "products/new",
            element: <AddProduct />,
          },
          {
            path: "products/:id/edit",
            element: <EditProduct />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
