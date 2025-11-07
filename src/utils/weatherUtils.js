export const getWeatherIcon = (weather) => {
  const iconMap = {
    Clear: "Sun",
    Clouds: "Cloud",
    Rain: "CloudRain",
    Drizzle: "CloudDrizzle",
    Thunderstorm: "CloudLightning",
    Snow: "CloudSnow",
    Mist: "CloudMist",
    Fog: "CloudFog",
    Haze: "CloudFog",
    Dust: "Wind",
    Sand: "Wind",
    Ash: "Wind",
    Squall: "Wind",
    Tornado: "Tornado",
  };
  return iconMap[weather] || "Cloud";
};

export const formatTemp = (temp, unit) => {
  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getWindDirection = (deg) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(deg / 22.5) % 16];
};
