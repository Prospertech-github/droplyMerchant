import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/Table/team-table";
import CalendarView from "@/components/partials/widget/CalendarView";
import Button from "@/components/ui/Button";
import BasicArea from "@/components/partials/widget/chart/BasicArea";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import { useRider } from "@/data/riders";
import dayjs from "dayjs";
import EditProject from "./EditProject";
import { useTBERidersModalStore } from "@/data/riders/modal";

// const statistics = [
//   {
//     title: "Wallet Balance",
//     count: "₦86,954",
//     bg: "bg-info-500",
//     text: "text-danger-500",
//   },
//   {
//     title: "Deliveries",
//     count: "354",
//     bg: "bg-warning-500",
//     text: "text-primary-500",
//   },{
//     title: "Rating",
//     count: "4.5",
//     bg: "bg-success-500",
//     text: "text-primary-500",
//   },
//   {
//     title:"Total Earnings",
//     count:"₦86,954",
//     bg:"bg-info-500",
//     text:"text-danger-500",
//   }
// ]

const RiderDetailsPage = () => {
  const { id } = useParams();
  const rider = useRider(id);

  if (rider.isLoading) {
    return (
      <>
        <div className="space-y-5">
          <Card className="h-24 animate-pulse w-full"></Card>
          <Card className="h-24 animate-pulse w-full"></Card>
          <Card className="h-24 animate-pulse w-full"></Card>
          <Card className="h-24 animate-pulse w-full"></Card>
          <Card className="h-24 animate-pulse w-full"></Card>
        </div>
      </>
    );
  }

  if (!rider.data) {
    return (
      <div className="h-full flex flex-col p-6 lg:p-16 justify-center items-center text-center">
        <div className="text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Rider not found
        </div>
        <div className="text-xl text-slate-600 dark:text-slate-300">
          The rider you are looking for does not exist.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-full">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-6">
            <div>
              {rider.data.user?.image_url ? (
                <figure className="w-24 rounded-full flex h-24 justify-center items-center border overflow-hidden">
                  <img
                    src={rider.data.user.image_url}
                    alt="user profile image"
                    className="w-full h-full object-cover"
                  />
                </figure>
              ) : (
                <span className="w-24 rounded-full flex h-24 justify-center items-center bg-sky-200 dark:bg-purple-900">
                  {rider.data.user.first_name[0]}
                  {rider.data.user.last_name[0]}
                </span>
              )}
            </div>
            <div>
              <address className="flex flex-col justify-between">
                <h2 className="-mt-4">
                  <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {rider.data.user.first_name} {rider.data.user.last_name}
                  </span>
                </h2>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {rider.data.user.phone}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {rider.data.user.email}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Lagos, Nigeria
                  </span>
                </p>
                <p>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Member since{" "}
                    {dayjs(rider.data.user.date_joined).format("MMMM, YYYY")}.
                  </span>
                </p>
              </address>
            </div>
            <div className="flex flex-col justify-between items-end gap-4">
              <span className="flex items-center gap-1 text-xs">
                Online{" "}
                <span className="bg-green-500 h-2 w-2 rounded-full inline-block" />
              </span>
              <Button
                className="bg-orange-200 dark:bg-orange-400"
                onClick={() => {
                  useTBERidersModalStore.setState({
                    rider: rider.data,
                    isOpen: true,
                  });
                }}
              >
                Edit Rider
              </Button>
            </div>
          </div>
        </Card>
        <BasicArea />
        <Card title="Last seen" className="xl:col-span-6 col-span-12">
          <TrackingParcel />
        </Card>
      </div>
      <div className="col-span-full">
        <ExampleTwo title="Latest orders" rider={id} />
      </div>
      <EditProject />
    </div>
  );
};

export default RiderDetailsPage;
