import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function NotificationPermissionLayout() {
  useEffect(() => {
    setTimeout(() => {}, 30000);
  }, []);

  return <Outlet />;
}
