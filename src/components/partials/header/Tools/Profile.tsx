import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import UserAvatar from "@/assets/images/all-img/user.png";
import { logout } from "@/api/logout";
import { useLoggedInUser } from "@/data/auth";

const Profile = () => {
  const navigate = useNavigate();
  const { data } = useLoggedInUser();

  const ProfileMenu = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",

      action: () => {
        navigate("/profile");
      },
    },

    {
      label: "Settings",
      icon: "heroicons-outline:cog",
      action: () => {
        navigate("/security");
      },
    },
    {
      label: "logout",
      icon: "heroicons-outline:login",
      action: logout,
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
          <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
            <img
              src={data?.image_url || UserAvatar}
              alt="profile image"
              className="block w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-none text-slate-600 dark:text-white font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block text-sm">
            {data?.first_name}
          </span>
        </div>
        <Dropdown
          label={
            <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
              <Icon icon="heroicons-outline:chevron-down"></Icon>
            </span>
          }
          classMenuItems="w-[180px] top-[58px]"
        >
          {ProfileMenu.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  onClick={() => item.action()}
                  className={`${
                    active
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                      : "text-slate-600 dark:text-slate-300"
                  } block`}
                >
                  <div className={`block cursor-pointer px-4 py-2`}>
                    <div className="flex items-center">
                      <span className="block text-xl ltr:mr-3 rtl:ml-3">
                        <Icon icon={item.icon} />
                      </span>
                      <span className="block text-sm">{item.label}</span>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </Dropdown>
      </div>
    </>
  );
};

export default Profile;
