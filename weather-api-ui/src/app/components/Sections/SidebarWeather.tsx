"use client";
import { useState, useEffect } from "react";
import { convertTemperature } from "../utils/temperatureConverter";

type SidebarWeatherProps = {
  currentWeather: any;
  unit: "metric" | "imperial";
  apiUnit: "metric" | "imperial";
};

export default function SidebarWeather({
  currentWeather,
  unit = "metric",
  apiUnit = "metric",
}: SidebarWeatherProps) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  // Use effect to update date and time on load/refresh
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format date functionn
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      // Format time
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    // Update immediately and then every minute
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // creation of  weather icon map using emojis
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      "01d": "☀️", // clear sky day
      "01n": "🌙", // clear sky night
      "02d": "⛅", // few clouds day
      "02n": "☁️", // few clouds night
      "03d": "☁️", // scattered clouds
      "03n": "☁️",
      "04d": "☁️", // broken clouds
      "04n": "☁️",
      "09d": "🌧️", // shower rain
      "09n": "🌧️",
      "10d": "🌦️", // rain day
      "10n": "🌧️", // rain night
      "11d": "⛈️", // thunderstorm
      "11n": "⛈️",
      "13d": "❄️", // snow
      "13n": "❄️",
      "50d": "🌫️", // mist
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌡️";
  };

  // Format temperature based on unit with conversion
  const formatTemp = (temp: number) => {
    // Convert temperature if units differ
    const convertedTemp = convertTemperature(temp, apiUnit, unit);
    return `${Math.round(convertedTemp)}°${unit === "metric" ? "C" : "F"}`;
  };

  if (!currentWeather) {
    return (
      <div className="h-full flex flex-col text-white">
        <div className="flex-1 flex items-center justify-center flex-col text-center">
          <h1 className="text-3xl font-bold mb-4">Weather App</h1>
          <p className="text-lg opacity-90">{date}</p>
          <p className="text-lg opacity-90">{time}</p>
          <div className="text-6xl my-6">🌤️</div>
          <p className="text-lg opacity-80">Loading weather for Nairobi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col text-white">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-top text-center">
          <div className="text-8xl my-4">
            {currentWeather.weather &&
              currentWeather.weather[0] &&
              getWeatherIcon(currentWeather.weather[0].icon)}
          </div>
          <h2 className="text-5xl font-bold mb-2">
            {formatTemp(currentWeather.main?.temp || 0)}
          </h2>
          <p className="text-2xl mb-4 capitalize">
            {(currentWeather.weather &&
              currentWeather.weather[0]?.description) ||
              ""}
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-lg">Feels like:</p>
              <p className="text-xl font-semibold">
                {formatTemp(currentWeather.main?.feels_like || 0)}
              </p>
            </div>
            <div className="border-l border-white border-opacity-30 pl-4">
              <p className="text-lg">Humidity:</p>
              <p className="text-xl font-semibold">
                {currentWeather.main?.humidity || 0}%
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg opacity-90">{date}</p>
          <p className="text-lg opacity-90">{time}</p>
          <h1 className="text-3xl font-bold mb-2">{currentWeather.name}</h1>
        </div>
      </div>
    </div>
  );
}
