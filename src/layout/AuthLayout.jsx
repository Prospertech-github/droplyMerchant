import React, { useEffect, Suspense } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Loading from "@/components/Loading";
const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Suspense fallback={<Loading />}>{<Outlet />}</Suspense>
    </>
  );
};

export default AuthLayout;
