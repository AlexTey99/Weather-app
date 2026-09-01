import './WeatherStats.scss';
import { useState, useEffect } from 'react';

interface StatItem {
    title: string;
    value: string;
}

function WeatherStats() {
    const [weatherData, setWeatherData] = useState<any>(null);

  
    useEffect(() => {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weather_code";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setWeatherData(data); 
            })
            .catch((error) => console.error('Error cargando la API:', error));
    }, []);

    const stats: StatItem[] = [
        { title: 'Feels Like', value: weatherData?.current?.apparent_temperature !== undefined ? `${weatherData.current.apparent_temperature}°` : '--' },
        { title: 'Humidity', value: weatherData?.hourly?.relative_humidity_2m?.[0] !== undefined ? `${weatherData.hourly.relative_humidity_2m[0]}%` : '--' },
        { title: 'Wind', value: weatherData?.current?.wind_speed_10m !== undefined ? `${weatherData.current.wind_speed_10m} km/h` : '--' },
        { title: 'Precipitation', value: weatherData?.current?.precipitation !== undefined ? `${weatherData.current.precipitation} mm` : '--' }
    ];

    return (
        <div className='midleContainer'>
            {
                stats.map((stat: StatItem) => (
                    <div key={stat.title} className='receivingData'>
                        <span>{stat.title}</span>
                        <span>{stat.value}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default WeatherStats;



