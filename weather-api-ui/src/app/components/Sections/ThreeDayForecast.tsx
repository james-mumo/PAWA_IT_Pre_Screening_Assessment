"use client";
import { useState, useEffect } from "react";
import { convertTemperature } from "../utils/temperatureConverter";

type ForecastDay = {
  date: string;
  temp: number;
  weather: string;
  icon: string;
  description: string;
};

type ThreeDayForecastProps = {
  forecast: any[];
  unit: "metric" | "imperial";
  apiUnit: "metric" | "imperial";
};

export default function ThreeDayForecast({
  forecast = [],
  unit = "metric",
  apiUnit = "metric",
}: ThreeDayForecastProps) {
  const [processedForecast, setProcessedForecast] = useState<ForecastDay[]>([]);

  // Process forecast data when it changes
  useEffect(() => {
    if (!forecast || forecast.length === 0) return;

    // Group forecast data by day (date)
    const dailyData: { [key: string]: any[] } = {};
    forecast.forEach((item) => {
      // Extract date without time part
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // For each day, calculate average temperature and get the most common weather
    const processedData = Object.keys(dailyData)
      .slice(0, 3)
      .map((date) => {
        const dayData = dailyData[date];
        // Calculate average temperature
        const totalTemp = dayData.reduce(
          (sum, item) => sum + item.main.temp,
          0
        );
        const avgTemp = totalTemp / dayData.length;

        // Get the most common weather condition
        const weatherCounts: { [key: string]: number } = {};
        let maxCount = 0;
        let mostCommonWeather = "";
        let weatherIcon = "";
        let weatherDescription = "";

        dayData.forEach((item) => {
          const weather = item.weather[0].main;
          weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
          if (weatherCounts[weather] > maxCount) {
            maxCount = weatherCounts[weather];
            mostCommonWeather = weather;
            weatherIcon = item.weather[0].icon;
            weatherDescription = item.weather[0].description;
          }
        });

        // Format date for display
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        return {
          date: formattedDate,
          temp: avgTemp,
          weather: mostCommonWeather,
          icon: weatherIcon,
          description: weatherDescription,
        };
      });

    setProcessedForecast(processedData);
  }, [forecast]);

  // function to create weather icon maps
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

  // Convert temperature based on unit
  const formatTemp = (temp: number) => {
    // Convert the temperature based on selected unit
    const convertedTemp = convertTemperature(temp, apiUnit, unit);
    const value = Math.round(convertedTemp);
    return `${value}°${unit === "metric" ? "C" : "F"}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 flex-grow w-full bg-white rounded-lg shadow p-4">
      {processedForecast.length > 0
        ? processedForecast.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-10 border rounded-lg hover:bg-blue-50 transition"
            >
              <div className="text-4xl mb-2">{getWeatherIcon(day.icon)}</div>
              <div className="font-semibold text-blue-500 text-lg">
                {day.date}
              </div>
              <div className="text-2xl text-blue-500 font-bold mt-2">
                {formatTemp(day.temp)}
              </div>
              <div className="text-sm text-blue-600  mt-1 capitalize">
                {day.description}
              </div>
            </div>
          ))
        : // Show placeholders when no data is available
          [1, 2, 3].map((day) => (
            <div
              key={day}
              className="flex flex-col items-center justify-center p-4 border rounded-lg bg-gray-50"
            >
              <div className="text-4xl mb-2">🌤️</div>
              <div className="font-semibold text-lg">Day {day}</div>
              <div className="text-2xl font-bold mt-2">
                --°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="text-sm text-gray-400 mt-1">No data</div>
            </div>
          ))}
    </div>
  );
}
