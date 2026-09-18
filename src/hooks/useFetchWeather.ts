import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { WeatherData } from '../Types/whaterTypes';

export const useFetchWeather = (url: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    if (!url) return;

    try {
      if (!data) setLoading(true);
      setError(null);

      const response = await axios.get<WeatherData>(url);
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || 'Error al obtener los datos del clima');
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { data, loading, error, refetch: fetchWeatherData };
};