import './WeatherStats.scss';

interface StatItem {
    title: string;
    value: string;
}

interface WeatherStatsProps {
    weatherData: any;
    dayIndex?: number;
}

function WeatherStats({ weatherData, dayIndex = 0 }: WeatherStatsProps) {
    const isToday = dayIndex === 0;

    const stats: StatItem[] = [
        {
            title: 'Feels Like',
            value: isToday
                ? (weatherData?.current?.apparent_temperature !== undefined ? `${Math.round(weatherData.current.apparent_temperature)}°` : '--')
                : (weatherData?.daily?.apparent_temperature_max?.[dayIndex] !== undefined ? `${Math.round(weatherData.daily.apparent_temperature_max[dayIndex])}°` : '--')
        },
        {
            title: 'Humidity',
            value: isToday
                ? (weatherData?.hourly?.relative_humidity_2m?.[0] !== undefined ? `${weatherData.hourly.relative_humidity_2m[0]}%` : '--')
                : (weatherData?.hourly?.relative_humidity_2m?.[dayIndex * 24] !== undefined ? `${weatherData.hourly.relative_humidity_2m[dayIndex * 24]}%` : '--')
        },
        {
            title: 'Wind',
            value: isToday
                ? (weatherData?.current?.wind_speed_10m !== undefined ? `${weatherData.current.wind_speed_10m} km/h` : '--')
                : (weatherData?.daily?.wind_speed_10m?.[dayIndex] !== undefined ? `${weatherData.daily.wind_speed_10m[dayIndex]} km/h` : '--')
        }
        ,
        {
            title: 'Precipitation',
            value: isToday
                ? (weatherData?.current?.precipitation !== undefined ? `${weatherData.current.precipitation} mm` : '--')
                : (weatherData?.daily?.precipitation_sum?.[dayIndex] !== undefined ? `${weatherData.daily.precipitation_sum[dayIndex]} mm` : '--')
        }
    ];

    return (
        <div className='midleContainer'>
            {
                stats.map((stat: StatItem) => (
                    <div key={stat.title} className='receivingData'>
                        <span>{stat.title}</span>
                        <span style={{ fontSize: '22px' }}>{stat.value}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default WeatherStats;




