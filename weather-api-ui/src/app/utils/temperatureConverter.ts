/**
 * Converts temperature value between Celsius and Fahrenheit and retuns the converted temperature value
 */
export function convertTemperature(
  temp: number,
  fromUnit: "metric" | "imperial",
  toUnit: "metric" | "imperial"
): number {
  // If the units are the same, no conversion needed
  if (fromUnit === toUnit) {
    return temp;
  }

  // Convert from Celsius to Fahrenheit
  if (fromUnit === "metric" && toUnit === "imperial") {
    return (temp * 9) / 5 + 32;
  }

  // Convert from Fahrenheit to Celsius
  if (fromUnit === "imperial" && toUnit === "metric") {
    return ((temp - 32) * 5) / 9;
  }

  // Fallback (should never happen)
  return temp;
}
