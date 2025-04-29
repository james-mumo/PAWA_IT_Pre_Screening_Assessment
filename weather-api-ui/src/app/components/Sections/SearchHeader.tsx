"use client";
import { useState, useEffect } from "react";

type SearchHeaderProps = {
  onSearch: (city: string) => void;
  onUnitChange: (unit: "metric" | "imperial") => void;
  defaultCity?: string;
};

export default function SearchHeader({
  onSearch,
  onUnitChange,
  defaultCity = "",
}: SearchHeaderProps) {
  const [city, setCity] = useState(defaultCity);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Set default city on component mount if provided
  useEffect(() => {
    if (defaultCity) {
      setCity(defaultCity);
    }
  }, [defaultCity]);

  const handleSearchClick = () => {
    if (!city) return;
    onSearch(city);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleUnitChange = (selectedUnit: "metric" | "imperial") => {
    setUnit(selectedUnit);
    onUnitChange(selectedUnit);
  };

  return (
    <div className="flex flex-row gap-12 bg-white p-3 rounded-sm items-center justify-between px-6 shadow-xl">
      {/* Search Box */}
      <div className="flex w-3/4 gap-2 items-center justify-between">
        <input
          type="text"
          className="input input-bordered p-2 w-full bg-gray-100 text-gray-700 focus:bg-white focus:border-blue-400 transition rounded-md"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn bg-blue-500 text-white hover:bg-blue-600 transition  py-2 px-5"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Toggle Units */}
      <div className="flex gap-0 justify-center">
        <button
          className={`btn transition p-2 ${
            unit === "metric"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </button>

        <button
          className={`btn transition p-2 ${
            unit === "imperial"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
