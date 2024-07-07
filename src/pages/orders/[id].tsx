import Card from "@/components/ui/Card";
import { useOrder } from "@/data/orders";
import { useParams } from "react-router-dom";
import styles from "./page.module.css";
import classNames from "classnames";
import moment from "dayjs";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function OrderDetailsPage() {
  const { id } = useParams() as { id: string };
  const { isLoading, data, isError, error } = useOrder(id);

  if (isLoading) {
    return (
      <div>
        <div className="bg-white shadow rounded-lg p-4 animate-pulse h-40" />
      </div>
    );
  }
  if (isError) {
    // @ts-ignore
    return <div>{error?.response?.data.message || "We could not load the details of this order"}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Order Details">
          <dl className={styles.list}>
            <div>
              <dt>Order ID</dt>
              <dd>{data?.id}</dd>
            </div>
            <div>
              <dt>Order Status</dt>
              <dd>{data?.status}</dd>
            </div>
            <div>
              <dt>Item Name</dt>
              <dd>{data?.item}</dd>
            </div>
            <div>
              <dt>Delivery Price</dt>
              <dd>
                {data?.amount?.toLocaleString(undefined, {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "narrowSymbol",
                })}
              </dd>
            </div>
          </dl>
        </Card>
        <Card title="Sender Details">
          <dl className={styles.list}>
            <div>
              <dt>Name</dt>
              <dd>{data?.name}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{data?.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{data?.email}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{data?.pickup}</dd>
            </div>
          </dl>
        </Card>
        <Card title="Rider Details">
          <dl className={styles.list}>
            <div>
              <dt>Name</dt>
              <dd>{data?.rider_info?.user.first_name + " " + data?.rider_info?.user.last_name}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{data?.rider_info?.user.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{data?.rider_info?.user.email}</dd>
            </div>
          </dl>
        </Card>
        <Card title="Receiver Details">
          <dl className={styles.list}>
            <div>
              <dt>Name</dt>
              <dd>{data?.recipient}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{data?.recipient_phone}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{data?.dropoff}</dd>
            </div>
          </dl>
        </Card>
      </div>
      <Card title="Order Progress" className="my-6">
        <div>
          <ol className="md:grid grid-cols-3 gap-y-8 2xl:grid-cols-5">
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <Icon icon="bx:bx-check" className="w-4 h-4 text-success-500" />
                </div>
                <div className="hidden sm:flex w-full bg-success-500 h-0.5"></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3
                  className={`text-lg font-semibold ${
                    data.created_at ? "text-success-500" : "text-gray-900 dark:text-white"
                  }`}>
                  Order Placed
                </h3>
                <time
                  dateTime={data.created_at}
                  className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Placed on {new Date(data.created_at).toDateString()}
                </time>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  {data.confirmed_at ? <Icon icon="bx:bx-check" className="w-4 h-4 text-success-500" /> : null}
                </div>
                <div
                  className={`hidden sm:flex w-full h-0.5 ${
                    data.confirmed_at ? "bg-success-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3
                  className={`text-lg font-semibold ${
                    data.confirmed_at ? "text-success-500" : "text-gray-900 dark:text-white"
                  }`}>
                  Order Confirmed
                </h3>
                <time
                  dateTime={data.confirmed_at}
                  className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Confirmed on {new Date(data.confirmed_at || 0).toDateString()}
                </time>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  {data.picked_at ? <Icon icon="bx:bx-check" className="w-4 h-4 text-success-500" /> : null}
                </div>
                <div
                  className={`hidden sm:flex w-full h-0.5 ${
                    data.picked_at ? "bg-success-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3
                  className={`text-lg font-semibold ${
                    data.picked_at ? "text-success-500" : "text-gray-900 dark:text-white"
                  }`}>
                  Item Picked
                </h3>
                {data.picked_at ? (
                  <time
                    dateTime={data.picked_at}
                    className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Picked on {new Date(data.picked_at).toDateString()}
                  </time>
                ) : null}
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  {data.in_transit_at ? <Icon icon="bx:bx-check" className="w-4 h-4 text-success-500" /> : null}
                </div>
                <div
                  className={`hidden sm:flex w-full h-0.5 ${
                    data.in_transit_at ? "bg-success-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3
                  className={`text-lg font-semibold ${
                    data.in_transit_at ? "text-success-500" : "text-gray-900 dark:text-white"
                  }`}>
                  In transit
                </h3>
                {data.in_transit_at ? (
                  <time
                    dateTime={data.in_transit_at}
                    className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    In transit on {new Date(data.in_transit_at).toDateString()}
                  </time>
                ) : null}
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  {data.completed_at ? <Icon icon="bx:bx-check" className="w-4 h-4 text-success-500" /> : null}
                </div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3
                  className={`text-lg font-semibold ${
                    data.completed_at ? "text-success-500" : "text-gray-900 dark:text-white"
                  }`}>
                  Delivered
                </h3>
                {data.completed_at ? (
                  <time
                    dateTime={data.completed_at}
                    className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Delivered on {new Date(data.completed_at).toDateString()}
                  </time>
                ) : null}
              </div>
            </li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
