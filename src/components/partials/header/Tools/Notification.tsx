import { useMemo } from "react";
import { Menu } from "@headlessui/react";
import moment from "moment";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { useNotifications } from "@/data/notifications";
import { useChangeNotificationStatus } from "@/mutations/notifications";
import { Link } from "react-router-dom";

const Notification = () => {
  const searchParams = { limit: "10", offset: "0" };

  const { data } = useNotifications(searchParams);

  const { mutateAsync: changeNotificationStatus } =
    useChangeNotificationStatus(searchParams);

  const unread = useMemo(() => {
    return data?.results?.filter((item) => !item.is_read);
  }, [data]);

  return (
    <Dropdown
      classMenuItems="md:w-[300px] top-[58px] max-h-[80vh] overflow-y-auto"
      label={
        <button className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
          <Icon
            icon="heroicons-outline:bell"
            className={
              unread && unread.length >= 1 ? "animate-tada" : undefined
            }
          />
          {unread && unread.length >= 1 && (
            <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
              {data?.results?.filter((item) => !item.is_read)?.length || 0}
            </span>
          )}
        </button>
      }
    >
      <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600 top-0 sticky dark:bg-slate-900 bg-slate-100">
        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
          Notifications
        </div>
        <Link to={"/notifications"} className="hover:underline">
          <small>View all</small>
        </Link>
      </div>
      {data?.results?.length ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.results.map((item, i) => (
            <Menu.Item key={i} as={"button"} className={"w-full"}>
              {({ active }) => (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await changeNotificationStatus({
                      id: item.id,
                      is_read: true,
                    });
                  }}
                  className={`${
                    active
                      ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                      : "text-slate-600 dark:text-slate-300"
                  } block w-full px-4 py-2 text-sm cursor-pointer`}
                >
                  <div className="flex ltr:text-left rtl:text-right gap-3">
                    {!item.is_read && (
                      <div>
                        <span className="h-[6px] w-[6px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                      </div>
                    )}
                    <div className="w-full">
                      <div
                        className={`${
                          active
                            ? "text-slate-600 dark:text-slate-300"
                            : " text-slate-600 dark:text-slate-300"
                        } text-sm`}
                      >
                        {item.message}
                      </div>
                      <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                        {moment(item.created_at).fromNow()}
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[150px]">
          <p>No new notification</p>
        </div>
      )}
    </Dropdown>
  );
};

export default Notification;
