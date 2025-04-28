<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5/';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    public function getCurrentWeather($city, $units = 'metric')
    {
        $response = Http::get($this->baseUrl . 'weather', [
            'q' => $city,
            'units' => $units,
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }

    public function getForecast($city, $units = 'metric')
    {
        $response = Http::get($this->baseUrl . 'forecast', [
            'q' => $city,
            'units' => $units,
            'cnt' => 24, // get data for about next 3 days (8 * 3)
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }

    public function searchCity($query)
    {
        $response = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $query,
            'limit' => 5, // limit to 5 cities
            'appid' => $this->apiKey,
        ]);

        return $response->json();
    }
}
