import Chart from "react-apexcharts";
import Card from "@/components/ui/Card";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { useDashboardRevenueChart } from "@/data/dashboard";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDarkmode from "@/hooks/useDarkMode";

export default function RevenueChart() {
  const [view, setView] = useState("7_days");
  return (
    <Card>
      <header className="md:flex md:space-y-0 space-y-4">
        <h6 className="flex-1 text-slate-900 dark:text-white capitalize">Revenue chart</h6>
        <div className="flex-none">
          <Listbox value={view} onChange={setView}>
            <div className="relative">
              <Listbox.Button className="text-lg inline-flex items-center justify-center border py-1 px-2 border-slate-200 dark:border-slate-700 rounded dark:text-slate-400">
                {map[view]} <Icon icon="heroicons-outline:dots-vertical" />
              </Listbox.Button>
              <Listbox.Options className="z-10 w-[140px] absolute right-0 mt-1 max-h-60 overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Object.entries(map).map(([key, value]) => (
                  <Listbox.Option key={key} value={key} className="p-2 cursor-pointer">
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </header>
      <div className="legend-ring">
        <RevenueChartBar view={view} />
      </div>
    </Card>
  );
}

function RevenueChartBar({ height = 300, view }) {
  const [isDark] = useDarkmode();
  const chart = useDashboardRevenueChart();

  if (chart.isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center space-y-2 p-6"
        style={{
          height,
        }}
        key={1}>
        <div className="h-8 w-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }
  if (chart.error) {
    return (
      <div
        className="flex flex-col gap-6  text-center items-center justify-center"
        style={{
          height,
        }}>
        <h4>Unable to load Chart</h4>
      </div>
    );
  }

  const series = [
    {
      data: view === "7_days" ? chart.data[view].map((item) => item.revenue) : Object.values(chart.data[view]),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#4669FA"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      colors: "#4669FA",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [50, 100, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
        formatter(value) {
          return Number(value).toLocaleString(undefined, {
            notation: "compact",
          });
        },
      },
    },
    xaxis: {
      categories: view === "7_days" ? chart.data[view].map((item) => item.day) : Object.keys(chart.data[view]),
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return <Chart type="area" height={height} series={series} options={options} />;
}

const map = {
  "7_days": "Last 7 days",
  monthly: "This month",
  yearly: "This year",
};
