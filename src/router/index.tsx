import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter, defer } from "react-router-dom";
import axios from "axios";

import Cart from "../pages/Cart/Cart";
import Error from "../pages/Error/Error";
import Layout from "../layout/Menu/Layout";
import ProductInfo from "../pages/ProductInfo/ProductInfo";
import AuthLayout from "../layout/Auth/AuthLayout";
import Login from "../pages/Forms/Login/Login";
import Registration from "../pages/Forms/Registration/Registration";
import Loader from "../components/Loader/Loader";

import { BASE_URL } from "../helpers/API";

const Menu = lazy(() => import("../pages/Menu/Menu"));

const routesApp: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <ProductInfo />,
        errorElement: <p>Ошибка</p>,
        loader: ({ params }) => {
          return defer({
            result: axios(`${BASE_URL}/products/${params.id}`),
          });
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export const routes = createBrowserRouter(routesApp);
