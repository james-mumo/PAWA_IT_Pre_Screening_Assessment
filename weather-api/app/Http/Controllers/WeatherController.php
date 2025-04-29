<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WeatherService;

class WeatherController extends Controller
{
    protected $weatherService;

    // constructor to inject the weather service into the controller
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    // method to handle the current weather request
    public function current(Request $request)
    {
        // get the city name from the query parameter
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        // fetch current weather data using the weather service
        $data = $this->weatherService->getCurrentWeather($city, $units);

        return response()->json($data);
    }

    // method to handle the 3-day forecast request
    public function forecast(Request $request)
    {
        // get the city name from the query parameter
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        // fetch forecast data using the weather service
        $data = $this->weatherService->getForecast($city, $units);

        return response()->json($data);
    }

    // method to search for a city
    public function search(Request $request)
    {
        // get the search query (city name) from the query parameter
        $query = $request->query('query');

        // search for city using the weather service
        $data = $this->weatherService->searchCity($query);
        return response()->json($data);
    }
}
