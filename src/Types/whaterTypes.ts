export type CurrentWeather = {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
};

export type HourlyWeather = {
  time: string[];
  wind_speed_10m: number[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
}

export type HourlyUnitsWeather = {
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  wind_speed_10m: string;
}

export type CurrentUnitsWeather = {
  interval: string;
  temperature_2m: string;
  time: string;
  wind_speed_10m: string;
}

export type DailyWeather = {
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}

export type WeatherData = {
  current: CurrentWeather;
  current_units: CurrentUnitsWeather;
  daily: DailyWeather;
  elevation: number;
  generationtime_ms: number;
  hourly: HourlyWeather;
  hourly_units: HourlyUnitsWeather;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
