import React, { useState } from "react";

import Card from "@/components/ui/Card";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import SelectMonth from "@/components/partials/SelectMonth";
import StackBarChart from "@/components/partials/widget/chart/stack-bar";
import Calculation from "@/components/partials/widget/chart/Calculation";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import useDashboard, { useDashboardChart } from "@/data/dashboard";
import { Link, useNavigate } from "react-router-dom";
import RevenueChart from "@/components/partials/widget/chart/revenue-chart";

export default function DashboardPage() {
  const dashboard = useDashboard();
  // useDashboardChart();

  if (dashboard.isError) {
    return <div>Error loading data</div>;
  }
  return (
    <div>
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <Card className="col-span-full">
            <div className="grid xl:grid-cols-4 md:grid-cols-2 col-span-1 gap-3">
              <GroupChart3 />
            </div>
          </Card>
          <div className="col-span-full grid xl:grid-cols-[2fr,1fr] gap-5">
            <StackBarChart />

            <Card title="Top Riders" className="">
              <TopRiders />
            </Card>
          </div>
        </div>
        <RevenueChart />
        <ExampleTwo title="Pending orders" />
      </div>
    </div>
  );
}

function TopRiders() {
  const { data, isLoading } = useDashboard();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={1}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={2}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={3}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-6" key={4}>
          <div className="h-8 w-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
        </div>
      </>
    );
  }
  if (!data.total_riders) {
    return (
      <div className="text-center flex flex-col gap-6 items-center justify-center h-32">
        <h4>You have no riders yet</h4>
        <button
          onClick={() => {
            navigate("/riders", {
              state: {
                create: true,
              },
            });
          }}
          className="btn btn-dark">
          Add a rider
        </button>
      </div>
    );
  }
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-start text-sm border-b border-slate-100 dark:border-slate-700">Name</th>
          <th className="text-end text-sm border-b border-slate-100 dark:border-slate-700">Deliveries</th>
        </tr>
      </thead>

      <tbody>
        {data.top_riders.map((item) => (
          <tr key={item.user__email}>
            <td className="text-sm border-b border-slate-100 dark:border-slate-700 py-2">
              {/* <Link to={`/riders/${item.id}`} className="flex items-center space-x-2"> */}
              <span>
                {item.user__first_name} {item.user__last_name}
              </span>
              {/* </Link> */}
            </td>
            <td className="text-end text-sm border-b border-slate-100 dark:border-slate-700 py-2">
              {item.order_count.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
