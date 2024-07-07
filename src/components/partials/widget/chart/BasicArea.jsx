import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { useRiderAnalytics } from "@/data/riders";
import { useParams } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react/dist/iconify.js";

const BasicArea = ({ height = 500, view }) => {
  const [isDark] = useDarkMode();
  const { id } = useParams();

  const { data, isLoading } = useRiderAnalytics(id);

  if (isLoading) {
    return <div style={{ height }} className="bg-slate-400 animate-pulse"></div>;
  }

  if (!data) {
    return (
      <div
        style={{
          height,
        }}
        className="text-center">
        <h4>No data available</h4>
      </div>
    );
  }
  const series = [
    {
      data: Object.values(data[view]),
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
      },
    },
    xaxis: {
      categories: Object.keys(data[view]),
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
  return (
    <div>
      <Chart options={options} series={series} type="area" height={height} />
    </div>
  );
};

export default function CompletedDeliveries() {
  const [view, setView] = React.useState("yearly");
  return (
    <Card className="xl:col-span-6 col-span-12 h-full">
      <header className="md:flex md:space-y-0 space-y-4">
        <h6 className="flex-1 text-slate-900 dark:text-white capitalize">Completed Deliveries</h6>
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
        <BasicArea view={view} />
      </div>
    </Card>
  );
}

const map = {
  monthly: "This Month",
  yearly: "This Year",
};
