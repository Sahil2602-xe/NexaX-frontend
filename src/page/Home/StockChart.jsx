import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/state/Coin/Action";

const timeSeries = [
  { label: "1 Day", value: 1 },
  { label: "1 Week", value: 7 },
  { label: "1 Month", value: 30 },
  { label: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [activeLabel, setActiveLabel] = useState(timeSeries[0]);

  const series = [
    {
      data:
        coin?.marketChart?.data?.map(([time, value]) => ({
          x: new Date(time),
          y: value,
        })) || [],
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 400,
      zoom: { autoScaleYaxis: true },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#9ca3af" } },
      axisBorder: { color: "#47535E" },
    },
    yaxis: {
      labels: { style: { colors: "#9ca3af" } },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#10b981"],
    tooltip: { theme: "dark" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  const handleActiveLabel = (value) => {
    setActiveLabel(value);
  };

  useEffect(() => {
    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLabel.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, coinId, activeLabel]);

  return (
    <div className="w-full bg-slate-900 border border-gray-700 rounded-xl p-5">
      {/* Time Range Buttons */}
      <div className="flex gap-3 mb-4">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            variant={activeLabel.label === item.label ? "default" : "outline"}
            onClick={() => handleActiveLabel(item)}
            className={`rounded-full text-sm px-4 ${
              activeLabel.label === item.label
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-gray-600 text-gray-300 hover:bg-slate-800"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* Chart Display */}
      <div id="chart-timelines">
        {series[0].data.length > 0 ? (
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={400}
          />
        ) : (
          <p className="text-center text-gray-400 py-20">Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default StockChart;
