import axios from "axios";
import { ForecastDay, Wether } from "../store/types/types";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_LOCALE = "en-US";
const DAILY_PARAMS = "weathercode,temperature_2m_max,temperature_2m_min";

interface OpenMeteoGeocodingResponse {
  results?: Array<{
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
  }>;
}

interface OpenMeteoForecastResponse {
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
  daily?: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  timezone?: string;
}

const mapWeatherCodeToIcon = (code?: number): string => {
  if (code === undefined || code === null) {
    return "./img/day/113.png";
  }

  const iconMap: Record<number, string> = {
    0: "./img/day/113.png", // Clear sky
    1: "./img/day/116.png",
    2: "./img/day/116.png",
    3: "./img/day/119.png",
    45: "./img/day/143.png",
    48: "./img/day/143.png",
    51: "./img/day/176.png",
    53: "./img/day/176.png",
    55: "./img/day/176.png",
    56: "./img/day/281.png",
    57: "./img/day/281.png",
    61: "./img/day/296.png",
    63: "./img/day/299.png",
    65: "./img/day/302.png",
    66: "./img/day/335.png",
    67: "./img/day/335.png",
    71: "./img/day/332.png",
    73: "./img/day/332.png",
    75: "./img/day/335.png",
    77: "./img/day/335.png",
    80: "./img/day/314.png",
    81: "./img/day/314.png",
    82: "./img/day/314.png",
    85: "./img/day/329.png",
    86: "./img/day/332.png",
    95: "./img/day/386.png",
    96: "./img/day/389.png",
    99: "./img/day/395.png",
  };

  return iconMap[code] ?? "./img/day/113.png";
};

const mapWeatherCodeToDescription = (code?: number): string => {
  if (code === undefined || code === null) {
    return "Unknown";
  }

  const descriptionMap: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return descriptionMap[code] ?? "Unknown";
};

const formatWeekday = (isoDate: string, locale: string = DEFAULT_LOCALE): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
};

const formatDateLabel = (isoDate: string, locale: string = DEFAULT_LOCALE): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(date);
};

export interface WetherServiceResponse {
  data: Wether;
  status: number;
  statusText: string;
  location: {
    name: string;
    country?: string;
  };
  requestedDays: number;
  timezone?: string;
}

export class WetherService {
  static async getCurrentWether(
    city: string,
    days: number = 7
  ): Promise<WetherServiceResponse> {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      throw new Error("City name is required");
    }

    const geocodingResponse = await axios.get<OpenMeteoGeocodingResponse>(
      GEOCODING_URL,
      {
        params: {
          name: trimmedCity,
          count: 1,
          language: "en",
        },
      }
    );

    const location = geocodingResponse.data.results?.[0];

    if (!location) {
      throw new Error(`No location found for "${trimmedCity}"`);
    }

    const weatherResponse = await axios.get<OpenMeteoForecastResponse>(
      FORECAST_URL,
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          current_weather: true,
          timezone: "auto",
          daily: DAILY_PARAMS,
          forecast_days: days,
        },
      }
    );

    const currentWeather = weatherResponse.data.current_weather;
    const daily = weatherResponse.data.daily;

    const forecastDays: ForecastDay[] =
      daily && daily.time && daily.weathercode && daily.temperature_2m_max && daily.temperature_2m_min
        ? daily.time.map((isoDate, index) => {
            const code = daily.weathercode[index];
            const maxTemp = daily.temperature_2m_max[index];
            const minTemp = daily.temperature_2m_min[index];

            return {
              isoDate,
              weekday: formatWeekday(isoDate),
              dateLabel: formatDateLabel(isoDate),
              icon: mapWeatherCodeToIcon(code),
              maxTempC: maxTemp,
              minTempC: minTemp,
              description: mapWeatherCodeToDescription(code),
            };
          })
        : [];

    const wether: Wether = {
      current: {
        temp_c: currentWeather?.temperature ?? 0,
        condition: {
          icon: mapWeatherCodeToIcon(currentWeather?.weathercode),
        },
      },
      forecast: {
        requestedDays: days,
        days: forecastDays,
      },
    };

    return {
      data: wether,
      status: weatherResponse.status,
      statusText: weatherResponse.statusText ?? "",
      location: {
        name: location.name,
        country: location.country,
      },
      requestedDays: days,
      timezone: weatherResponse.data.timezone,
    };
  }
}
