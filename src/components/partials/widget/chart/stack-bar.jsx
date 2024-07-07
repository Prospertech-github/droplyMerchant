import { useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";
import { useDashboardChart } from "@/data/dashboard";
import Card from "@/components/ui/Card";
import SelectMonth from "../../SelectMonth";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const StackBarChart = ({ height = 450, view = "7_days" }) => {
  const [isDark] = useDarkMode();
  const chart = useDashboardChart();

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

  const data =
    view === "7_days"
      ? chart.data["7_days"]
      : Object.entries(chart.data[view]).map(([key, value]) => {
          value.day = key;
          return value;
        });

  const series = [
    {
      name: "Pending Pickup",
      data: data.map((item) => item.confirmed),
    },
    {
      name: "Picked up",
      data: data.map((item) => item.picked),
    },
    {
      name: "In Transit",
      data: data.map((item) => item["in-transit"]),
    },
    {
      name: "Delivered",
      data: data.map((item) => item.completed),
    },
  ];
  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "55%",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: 0,
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },

    xaxis: {
      categories: data.map((item) => item.day),
      labels: {
        offsetY: -3,
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

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return Number(val).toLocaleString();
        },
      },
    },
    colors: [colors.warning, colors.primary, colors.info, colors.success],
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
  };

  return (
    <>
      <Chart options={options} series={series} type="bar" height={height} />
    </>
  );
};

export default function OrderSummaryChart() {
  const [view, setView] = useState("7_days");

  return (
    <Card>
      <header className="md:flex md:space-y-0 space-y-4">
        <h6 className="flex-1 text-slate-900 dark:text-white capitalize">Orders by delivery stage</h6>
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
        <StackBarChart view={view} />
      </div>
    </Card>
  );
}

const map = {
  "7_days": "Last 7 days",
  monthly: "This month",
  yearly: "This year",
};
