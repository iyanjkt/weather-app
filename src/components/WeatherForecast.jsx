import { Calendar, Droplets } from "lucide-react";
import React from "react";
import { formatTemp, getWeatherIcon } from "../utils/weatherUtils";
import * as LucideIcons from "lucide-react";

function WeatherForecast({ forecast, unit }) {
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!acc[date]) {
      acc[date] = item;
    }

    return acc;
  }, {});

  const dailyItems = Object.values(dailyForecast).slice(1, 6);

  return (
    <div className=" bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className=" flex items-center space-x-3 mb-8">
        <div className=" p-2 bg-white/1- rounded-full">
          <Calendar className=" w-6 h-6 text-white/80 " />
        </div>
        <h2 className=" text-2xl font-bold text-white">5 Day Forecast</h2>
      </div>

      <div className=" space-y-4">
        {/* Map Method Logic */}
        {dailyItems.map((item, index) => {
          const { dt, weather, main, pop } = item;
          const { description } = weather[0];
          const { temp, temp_max } = main;
          const iconName = getWeatherIcon(weather[0].main);
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
          return (
            <div
              key={index}
              className=" flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10"
            >
              <div className=" flex items-center space-x-5 flex-1">
                <div className=" text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-300">
                  {/* Dynamic Icons */}
                  <IconComponent className="w-9 h-9" />
                </div>
                <div className=" flex-1 ">
                  <div className=" text-white font-bold td:text-xl text-lg">
                    {new Date(dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div className=" text-white/70 md:text-sm text-xs capitalize font-medium">
                    {description}
                  </div>
                </div>
                <div className=" flex items-center md:space-x-6 space-x-5">
                  <div className=" flex items-center space-x-2 text-white/60">
                    <Droplets className=" w-4 h-4 text-blue-300" />
                    <span className=" text-sm font-medium">
                      {Math.round(pop * 100)}%
                    </span>
                  </div>
                  <div className=" text-right">
                    <div className=" text-white font-bold md:text-xl text-lg ">
                      {`${formatTemp(temp, unit)} °${unit} `}
                    </div>
                    <div className=" text-white/70 md:text-sm text-xs font-medium ">
                      {`High ${formatTemp(temp_max, unit)} °${unit} `}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;
