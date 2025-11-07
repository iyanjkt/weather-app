import React from "react";

const TemperatureToggle = ({ unit, toggle }) => {
  return (
    <div className=" bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={toggle}
          className={`hover:cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            unit === "C" ? "bg-white/30 text-white" : "text-white/40"
          }`}
        >
          °C
        </button>
        <button
          onClick={toggle}
          className={`hover:cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            unit === "F" ? "bg-white/30 text-white" : "text-white/40"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default TemperatureToggle;
