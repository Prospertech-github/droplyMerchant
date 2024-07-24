import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Suspense } from "react";
import { NavLink, Outlet, useMatch } from "react-router-dom";

const menus = [
  {
    title: "Profile",
    to: "profile",
  },
  {
    title: "Company information",
    to: "company",
  },
  {
    title: "Financial Information",
    to: "finances",
  },
  {
    title: "Bank information",
    to: "bank",
  },
  {
    title: "Security",
    to: "security",
  },
];
export default function SettingsLayout() {
  const match = useMatch("/:page")?.params?.page || "profile";
  const title = menus.find((item) => item.to === match)?.title || "Profile";
  return (
    <div>
      <div className="grid gap-5 grid-cols-12">
        <div className="xl:col-span-3 lg:col-span-4 col-span-12 card-auto-height">
          {/* @ts-ignore */}
          <Card>
            <ul className="flex flex-col space-y-1 text-start items-stretch">
              {menus.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.to}
                    className={({
                      isActive,
                    }) => `focus:ring-0 focus:outline-none space-x-2 text-sm flex items-center w-full transition duration-150 px-3 py-4 rounded-[6px] rtl:space-x-reverse
                      ${
                        isActive
                          ? "bg-slate-100 dark:bg-slate-900 dark:text-white"
                          : "bg-white dark:bg-slate-800 dark:text-slate-300"
                      }
                      `}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`
                              "text-lg",
                              ${
                                isActive
                                  ? " opacity-100"
                                  : "opacity-50 dark:opacity-100"
                              }
                        `}
                        ></span>
                        <Icon icon="heroicons:chevron-double-right-solid" />
                        <span> {item.title}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="xl:col-span-9 lg:col-span-8 col-span-12">
          <Card title={title} className="min-h-[80vh]">
            <Suspense fallback={""}>
              <Outlet />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
}
