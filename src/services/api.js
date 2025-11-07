import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_BASEURL;
const baseUrlGeo = import.meta.env.VITE_GEO;

export const getCurrentWeather = async (city = "Jakarta") => {
  try {
    const response = await axios.get(
      `${baseUrl}/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    let weatherData = response.data;

    if (!weatherData.dt) {
      weatherData.dt = Math.floor(Date.now() / 1000);
    }

    return weatherData;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error(`City not found.`);
      } else if (status === 401) {
        throw new Error(`Invalid API key.`);
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., timeout, server down)
      throw new Error("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error (e.g., network issue)
      throw new Error("Network error. Please check your internet connection.");
    }
  }
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    let weatherData = response.data;

    if (!weatherData.dt) {
      weatherData.dt = Math.floor(Date.now() / 1000);
    }

    return weatherData;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error(`Coordinate not found.`);
      } else if (status === 401) {
        throw new Error(`Invalid API key.`);
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., timeout, server down)
      throw new Error("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error (e.g., network issue)
      throw new Error("Network error. Please check your internet connection.");
    }
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(
      `${baseUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`
    );

    let weatherData = response.data;
    return weatherData;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error(`City not found.`);
      } else if (status === 401) {
        throw new Error(`Invalid API key.`);
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., timeout, server down)
      throw new Error("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error (e.g., network issue)
      throw new Error("Network error. Please check your internet connection.");
    }
  }
};

export const searchCities = async (query) => {
  try {
    const response = await axios.get(
      `${baseUrlGeo}?q=${query}&limit=5&appid=${apiKey}`
    );

    let cities = response.data;
    return cities.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error(`City not found.`);
      } else if (status === 401) {
        throw new Error(`Invalid API key.`);
      }
    } else if (error.request) {
      // The request was made, but no response was received (e.g., timeout, server down)
      throw new Error("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error (e.g., network issue)
      throw new Error("Network error. Please check your internet connection.");
    }
  }
};
