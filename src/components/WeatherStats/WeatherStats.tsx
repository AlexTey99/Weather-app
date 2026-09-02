import './WeatherStats.scss';

interface StatItem {
    title: string;
    value: string;
}
interface WeatherStatsProps {
    weatherData: any;
}


function WeatherStats({ weatherData }: WeatherStatsProps) {
    // const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weather_code";

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



