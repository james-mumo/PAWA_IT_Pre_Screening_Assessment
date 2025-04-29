"use client";
import { useState, useEffect } from "react";
import SearchHeader from "../Sections/SearchHeader";
import ThreeDayForecast from "../Sections/ThreeDayForecast";
import StatsGrid from "../Sections/StatsGrid";
import { getCurrentWeather, getForecast } from "../utils/api";
import SidebarWeather from "../Sections/SidebarWeather";

export default function MainLayout() {
  // Data states
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [apiData, setApiData] = useState({
    currentWeather: null,
    forecast: [],
    fetchedWithUnit: "metric" as "metric" | "imperial",
  });

  // UI states
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Nairobi by default when the component mounts
  useEffect(() => {
    handleSearch("Nairobi");
  }, []);

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Get current weather data
      const weather = await getCurrentWeather(city);
      setCurrentWeather(weather);

      // Get forecast data
      const forecastData = await getForecast(city);
      setForecast(forecastData.list || []);

      // save the API data in the ApiData use state
      setApiData({
        currentWeather: weather,
        forecast: forecastData.list || [],
        fetchedWithUnit: "metric", 
      });
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
      // here i am clearing previous data on error
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    setUnit(newUnit);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* LEFT Sidebar */}
      <div className="w-full lg:w-1/5 bg-gradient-to-b from-blue-500 to-blue-700 p-4 lg:p-6">
        <SidebarWeather
          currentWeather={currentWeather}
          unit={unit}
          apiUnit="metric" 
        />
      </div>

      {/* RIGHT side components */}
      <div className="w-full lg:w-4/5 p-4 lg:p-2 overflow-y-auto flex flex-col h-screen">
        <SearchHeader
          onSearch={handleSearch}
          onUnitChange={handleUnitChange}
          defaultCity="Nairobi"
        />

        {isLoading && (
          <div className="flex justify-center items-center my-8 flex-grow">
            <p className="text-gray-500">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && forecast.length > 0 && (
          <>
            <div className="mt-2 flex-grow">
              <ThreeDayForecast
                forecast={forecast}
                unit={unit}
                apiUnit="metric"
              />
            </div>
            <div className="mt-2 flex-grow">
              <StatsGrid
                currentWeather={currentWeather}
                unit={unit}
                apiUnit="metric"
              />
            </div>
          </>
        )}

        {!isLoading && !error && forecast.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center my-12 text-gray-500 flex-grow">
            <p className="text-xl mb-2">
              Search for a city to see the weather forecast
            </p>
            <p>Example: London, Tokyo, New York</p>
          </div>
        )}
      </div>
    </div>
  );
}
