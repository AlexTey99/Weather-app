import { useState, useEffect } from 'react';
import axios from 'axios';
import type { WeatherData } from '../Types/whaterTypes';

export const useFetchWeather = (url: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchWeatherData = async () => {
      if (!data) setLoading(true);
      setError(null);

      try {
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
    };

    fetchWeatherData();
  }, [url]);

  return { data, loading, error };
};