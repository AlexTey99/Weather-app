import './WeatherStats.scss';

interface StatItem {
    title: string;
    value: string;
}

interface WeatherStatsProps {
    weatherData: any;
    dayIndex?: number;
    // 1. Añadimos las tres props de las unidades en la interfaz
    tempUnit: string;
    windUnit: string;
    precipUnit: string;
    loading: boolean;
}

// 2. Recibimos las tres nuevas props en la función
function WeatherStats({ weatherData, dayIndex = 0, tempUnit, windUnit, precipUnit, loading }: WeatherStatsProps) {
    const isToday = dayIndex === 0;

    // Guardamos los valores base de forma segura para aplicar las fórmulas
    const currentFeelsLike = weatherData?.current?.apparent_temperature;
    const dailyFeelsLike = weatherData?.daily?.apparent_temperature_max?.[dayIndex];

    const currentWind = weatherData?.current?.wind_speed_10m;
    const dailyWind = weatherData?.daily?.wind_speed_10m_max?.[dayIndex]; // Usamos max por seguridad para el daily

    const currentPrecip = weatherData?.current?.precipitation;
    const dailyPrecip = weatherData?.daily?.precipitation_sum?.[dayIndex];

    const stats: StatItem[] = [
        {
            title: 'Feels Like',
            value: isToday
                ? (currentFeelsLike !== undefined && currentFeelsLike !== null
                    ? (tempUnit === 'celsius'
                        ? `${Math.round(currentFeelsLike)}°C`
                        : `${Math.round((currentFeelsLike * 9) / 5 + 32)}°F`)
                    : '--')
                : (dailyFeelsLike !== undefined && dailyFeelsLike !== null
                    ? (tempUnit === 'celsius'
                        ? `${Math.round(dailyFeelsLike)}°C`
                        : `${Math.round((dailyFeelsLike * 9) / 5 + 32)}°F`)
                    : '--')
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
                ? (currentWind !== undefined && currentWind !== null
                    ? (windUnit === 'kmh'
                        ? `${currentWind} km/h`
                        : `${(currentWind * 0.621371).toFixed(1)} mph`)
                    : '--')
                : (dailyWind !== undefined && dailyWind !== null
                    ? (windUnit === 'kmh'
                        ? `${dailyWind} km/h`
                        : `${(dailyWind * 0.621371).toFixed(1)} mph`)
                    : '--')
        },
        {
            title: 'Precipitation',
            value: isToday
                ? (currentPrecip !== undefined && currentPrecip !== null
                    ? (precipUnit === 'mm'
                        ? `${currentPrecip} mm`
                        : `${(currentPrecip * 0.0393701).toFixed(2)} in`)
                    : '--')
                : (dailyPrecip !== undefined && dailyPrecip !== null
                    ? (precipUnit === 'mm'
                        ? `${dailyPrecip} mm`
                        : `${(dailyPrecip * 0.0393701).toFixed(2)} in`)
                    : '--')
        }
    ];

    return (
        <div className="midleContainer">
            {stats.map((stat: StatItem) => (
                <div key={stat.title} className="receivingData">
                    <span>{stat.title}</span>
                    <span style={{ fontSize: '22px' }}>
                        {loading ? '--' : stat.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default WeatherStats;





