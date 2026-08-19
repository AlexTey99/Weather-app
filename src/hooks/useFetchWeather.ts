import { useState, useEffect } from 'react';
import axios from 'axios';
import type { WeatherData } from '../Types/whaterTypes';

export const useFetchWeather = (url: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
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
    };

    if (url) {
      fetchWeatherData();
    }
  }, [url]);

  return { data, loading, error };
};