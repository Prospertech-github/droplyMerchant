import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
import { fetchUserIfTokenExists } from "./utils/api";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
import Loading from "@/components/Loading";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import NotFound from "./pages/404";
import { API_TOKEN } from "./app-constants";
import SettingsLayout from "./layout/settings";
import CompleteSignUp from "./pages/complete-signup";
import VerifyPage from "./pages/verify";
import ForgotPasswordPage from "./pages/forgot-password";
import PasswordResetPage from "./pages/password-reset";
const Register = lazy(() => import("./pages/register"));
const Riders = lazy(() => import("./pages/riders"));
const RiderDetails = lazy(() => import("./pages/riders/rider-details"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/orders/[id]"));
const Profile = lazy(() => import("./pages/profile"));
const Bank = lazy(() => import("./pages/bank"));
const Company = lazy(() => import("./pages/company"));
const Finances = lazy(() => import("./pages/finances"));
const Security = lazy(() => import("./pages/security"));
const Wallet = lazy(() => import("./pages/wallet"));
const Loans = lazy(() => import("./pages/loans"));

async function loader() {
  try {
    await fetchUserIfTokenExists();

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        path="/"
        loader={() => {
          if (localStorage.getItem(API_TOKEN)) {
            return new Response("", {
              status: 302,
              headers: {
                Location: "/dashboard",
              },
            });
          } else {
            return new Response("", {
              status: 302,
              headers: {
                Location: "/login",
              },
            });
          }
        }}
      />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Route>
      <Route loader={loader} path="/*">
        <Route path="complete-signup" element={<CompleteSignUp />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="riders" element={<Riders />} />
          <Route path="riders/:id" element={<RiderDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="loans" element={<Loans />} />
          <Route element={<SettingsLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="bank" element={<Bank />} />
            <Route path="finances" element={<Finances />} />
            <Route path="company" element={<Company />} />
            <Route path="security" element={<Security />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Route>
  )
);
function App() {
  return (
    <main className="App relative">
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </main>
  );
}

export default App;
