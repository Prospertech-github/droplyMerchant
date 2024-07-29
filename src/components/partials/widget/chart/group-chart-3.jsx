import React from "react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";
import shade1 from "@/assets/images/all-img/shade-1.png";
import shade2 from "@/assets/images/all-img/shade-2.png";
import shade3 from "@/assets/images/all-img/shade-3.png";
import shade4 from "@/assets/images/all-img/shade-4.png";
import useDashboard from "@/data/dashboard";

const statistics = [
  {
    bg: "bg-warning-500",
    text: "text-primary-500",
    img: shade1,
  },
  {
    bg: "bg-info-500",
    text: "text-danger-500",
    img: shade2,
  },
  {
    bg: "bg-primary-500",
    text: "text-primary-500",
    img: shade3,
  },
  {
    bg: "bg-success-500",
    text: "text-primary-500",
    img: shade4,
  },
];
const GroupChart3 = () => {
  const { data, isLoading } = useDashboard();
  if (isLoading) {
    return (
      <>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={1}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={2}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={3}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div
          className="flex flex-col items-center justify-center space-y-2 p-6"
          key={4}
        >
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`${statistics[1].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
      >
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img
            src={statistics[1].img}
            alt=""
            draggable="false"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
          All time revenue
        </span>
        <span className="block text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.revenue.total_revenue_all_time.toLocaleString(undefined, {
            style: "currency",
            currency: "NGN",
            currencyDisplay: "narrowSymbol",
          })}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <span
            className={clsx(
              "inline-flex items-center gap-2 text-success-700 dark:text-success-300"
            )}
          >
            <Icon
              icon={
                data.revenue.total_revenue_this_month <
                data.revenue.total_revenue_last_month
                  ? "heroicons:arrow-trending-down"
                  : "heroicons:arrow-trending-up"
              }
            />{" "}
            <span className="text-sm">
              {!!data.revenue.total_revenue_this_month &&
              !!data.revenue.total_revenue_last_month
                ? Math.abs(
                    (data.revenue.total_revenue_this_month -
                      data.revenue.total_revenue_last_month) /
                      data.revenue.total_revenue_last_month
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0%"}{" "}
              from last month
            </span>
          </span>
          <div className="text-sm">
            <span className={`mb-[2px]`}>
              {data.revenue.total_revenue_this_month.toLocaleString(undefined, {
                style: "currency",
                currency: "NGN",
                currencyDisplay: "narrowSymbol",
              })}{" "}
            </span>
            <span className=" text-slate-600 dark:text-slate-300">
              this month
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${statistics[0].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
      >
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img
            src={statistics[0].img}
            alt=""
            draggable="false"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
          Total orders
        </span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-4">
          {data.order.total_orders_all_time}
        </span>
        <div className="flex flex-col rtl:space-x-reverse">
          <span
            className={clsx(
              "inline-flex items-center gap-2 text-success-700 dark:text-success-300"
            )}
          >
            <Icon
              icon={
                data.order.total_orders_this_month <
                data.order.total_orders_last_month
                  ? "heroicons:arrow-trending-down"
                  : "heroicons:arrow-trending-up"
              }
            />{" "}
            <span className="text-sm">
              {!!data.order.total_orders_this_month &&
              !!data.order.total_orders_last_month
                ? Math.abs(
                    (data.order.total_orders_this_month -
                      data.order.total_orders_last_month) /
                      data.order.total_orders_last_month
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0%"}{" "}
              from last month
            </span>
          </span>
          <div className="text-sm">
            <span className={`mb-[2px]`}>
              {data.order.total_orders_this_month} orders{" "}
            </span>
            <span className=" text-slate-600 dark:text-slate-300">
              this month
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${statistics[2].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
      >
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img
            src={statistics[2].img}
            alt=""
            draggable="false"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
          Total riders
        </span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
          {data.total_riders.toLocaleString()}
        </span>
      </div>
      <div
        className={`${statistics[3].bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]`}
      >
        <div className="overlay absolute left-0 top-0 w-full h-full z-[-1]">
          <img
            src={statistics[3].img}
            alt=""
            draggable="false"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="block mb-6 text-sm text-slate-900 dark:text-white font-medium">
          Average rating
        </span>
        <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6">
          {/* {data.rating.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })} */}
          0
        </span>
      </div>
    </>
  );
};

export default GroupChart3;
