// here we defined the backend url from env and filure fo env to load we manullay set it
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"; 

/**
 * function for searching for a city's weather by name
 */
export async function searchCity(city: string) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/search?city=${encodeURIComponent(city)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching city search: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search City Error:", error);
    throw error;
  }
}

/**
 * Get current weather.
 * @param city The city name to get weather for
 * @param unit Currently not used by the backend, but kept for future compatibility
 */
export async function getCurrentWeather(
  city: string,
  unit?: "metric" | "imperial"
) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching current weather: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get Current Weather Error:", error);
    throw error;
  }
}

/**
 * Get weather forecast for a city
 */
export async function getForecast(city: string, unit?: "metric" | "imperial") {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/forecast?city=${encodeURIComponent(city)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching forecast: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get Forecast Error:", error);
    throw error;
  }
}
