<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    // initialize API key and base URL for the OpenWeather API
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5/';

    public function __construct()
    {
        // fetch the API key from the .env file
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    // get the current weather data for a city
    public function getCurrentWeather($city, $units = 'metric')
    {
        // make a GET request to the OpenWeather API to fetch current weather data
        $response = Http::get($this->baseUrl . 'weather', [
            'q' => $city,
            'units' => $units,
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }

    // get the 3-day weather forecast for a city
    public function getForecast($city, $units = 'metric')
    {
        // make a GET request to fetch forecast data
        $response = Http::get($this->baseUrl . 'forecast', [
            'q' => $city,
            'units' => $units,
            'cnt' => 24,
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }

    // search for a city based on a query string
    public function searchCity($query)
    {
        // make a GET request to OpenWeather's geocoding API to search for cities
        $response = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $query,
            'limit' => 5, // limit to 5 cities
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }
}
