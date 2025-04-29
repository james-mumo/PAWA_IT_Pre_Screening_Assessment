"use client";

type StatsGridProps = {
  currentWeather: any;
  unit: "metric" | "imperial";
  apiUnit: "metric" | "imperial";
};

export default function StatsGrid({
  currentWeather,
  unit = "metric",
}: StatsGridProps) {
  // format wind speed according to selected unit
const formatWindSpeed = (speed: number) => {
  if (unit === "imperial") {
    
    const mph = speed * 2.237; 
    return `${Math.round(mph)} mph`;
  } else {
    // Convert m/s to km/h
    const kmh = speed * 3.6;
    return `${Math.round(kmh)} km/h`;
  }
};

  // Get wind direction as text
  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Wind Status */}
      <div className="p-10 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center">
        <div className="text-4xl">💨</div>
        <div className="text-xl text-blue-500  font-bold mt-3 mb-1">
          Wind Status
        </div>

        {currentWeather && currentWeather.wind ? (
          <>
            <div className="text-3xl font-semibold text-blue-500 my-2">
              {formatWindSpeed(currentWeather.wind.speed)}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span
                className="inline-block w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                style={{ transform: `rotate(${currentWeather.wind.deg}deg)` }}
              >
                ↑
              </span>
              <span>{getWindDirection(currentWeather.wind.deg)}</span>
            </div>
            {currentWeather.wind.gust && (
              <div className="mt-2 text-sm text-blue-500 ">
                Gusts: {formatWindSpeed(currentWeather.wind.gust)}
              </div>
            )}
          </>
        ) : (
          <div className="text-blue-500  my-4">No data available</div>
        )}
      </div>

      {/* Humidity */}
      <div className="p-10 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center">
        <div className="text-4xl">💧</div>
        <div className="text-xl font-bold mt-3 text-blue-500  mb-1">
          Humidity
        </div>

        {currentWeather && currentWeather.main ? (
          <>
            <div className="text-3xl font-semibold text-blue-500 my-2">
              {currentWeather.main.humidity}%
            </div>

            {/* Humidity level indicator */}
            <div className="w-full max-w-xs mt-2">
              <div className="flex justify-between text-xs text-blue-500  mb-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${currentWeather.main.humidity}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-blue-500 ">
                {currentWeather.main.humidity < 30
                  ? "Low"
                  : currentWeather.main.humidity > 70
                  ? "High"
                  : "Normal"}{" "}
                humidity
              </div>
            </div>
          </>
        ) : (
          <div className="text-blue-500  my-4">No data available</div>
        )}
      </div>
    </div>
  );
}
