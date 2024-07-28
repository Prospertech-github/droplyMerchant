import { useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItems } from "@/constant/data";
import Icon from "@/components/ui/Icon";

const Breadcrumbs = () => {
  const location = useLocation();
  const locationName = location.pathname.replace("/", "");

  const title: Partial<Record<
    "title" | "link" | "icon" | "childtitle" | "childlink",
    string
  > | null> = useMemo(() => {
    for (let item of menuItems) {
      if (item.link === locationName) {
        return item;
      }
      if (item.child) {
        for (let child of item.child) {
          if (child.childlink === locationName) {
            return child;
          }
        }
      }
    }

    return null;
  }, [locationName]);

  if (locationName === "dashboard") {
    return null;
  }

  return (
    <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
      <ul className="breadcrumbs">
        <li className="text-primary-500">
          <NavLink to="/dashboard" className="text-lg">
            <Icon icon="heroicons-outline:home" />
          </NavLink>
          <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
            <Icon icon="heroicons:chevron-right" />
          </span>
        </li>
        {locationName &&
          locationName.split("/").map((str, index) => {
            if (locationName.split("/").length === index + 1) {
              return (
                <li
                  key={index}
                  className="capitalize text-slate-500 dark:text-slate-400"
                >
                  {title?.title || title?.childtitle || str}
                </li>
              );
            }

            return (
              <li key={index}>
                <NavLink to={`/${str}`} className="capitalize text-primary-500">
                  {str}
                </NavLink>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
