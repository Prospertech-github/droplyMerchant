import Card from "@/components/ui/Card";
import { useNotifications } from "@/data/notifications";
import { useChangeNotificationStatus } from "@/mutations/notifications";
import { Menu } from "@headlessui/react";
import moment from "moment";

export default function Notifications() {
  const searchParams = { limit: "50", offset: "0" };

  const { data } = useNotifications(searchParams);

  const { mutateAsync: changeNotificationStatus } =
    useChangeNotificationStatus(searchParams);

  // const unread = useMemo(() => {
  //   return data?.results?.filter((item) => !item.is_read);
  // }, [data]);

  return (
    <Menu>
      <Card className="mt-4" title={"Notifications"}>
        {data?.results?.length ? (
          data.results.map((item, i) => (
            <Menu.Item
              key={i}
              as={"button"}
              disabled={item.is_read}
              onClick={async (e) => {
                e.stopPropagation();
                await changeNotificationStatus({
                  id: item.id,
                  is_read: true,
                });
              }}
              className={"w-full"}
            >
              {({ active }) => (
                <div
                  className={`${
                    active
                      ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                      : "text-slate-600 dark:text-slate-300"
                  } block w-full px-4 py-2 text-lg cursor-pointer`}
                >
                  <div className="flex ltr:text-left rtl:text-right gap-3">
                    {!item.is_read && (
                      <div>
                        <span className="h-[8px] w-[8px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                      </div>
                    )}
                    <div className="w-full">
                      <div
                        className={`${
                          active
                            ? "text-slate-600 dark:text-slate-300"
                            : " text-slate-600 dark:text-slate-300"
                        } text-base`}
                      >
                        {item.message}
                      </div>
                      <div className="text-slate-400 dark:text-slate-400 text-sm mt-1">
                        {moment(item.created_at).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))
        ) : (
          <div className="flex items-center justify-center h-[150px]">
            <p>No new notification</p>
          </div>
        )}
      </Card>
    </Menu>
  );
}
