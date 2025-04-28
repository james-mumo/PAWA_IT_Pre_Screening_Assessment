<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WeatherService;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    public function current(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        $data = $this->weatherService->getCurrentWeather($city, $units);

        return response()->json($data);
    }

    public function forecast(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric');

        $data = $this->weatherService->getForecast($city, $units);

        return response()->json($data);
    }

    public function search(Request $request)
    {
        $query = $request->query('query');

        $data = $this->weatherService->searchCity($query);

        return response()->json($data);
    }
}
