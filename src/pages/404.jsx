import React from "react";
import { Link } from "react-router-dom";

import NotFoundImage from "@/assets/images/all-img/404-2.svg";
function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <img src={NotFoundImage} alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-8">
        <h4 className="text-slate-900 mb-4">Page not found</h4>
        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link to="/dashboard" className="btn btn-dark dark:bg-slate-800 block text-center">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
