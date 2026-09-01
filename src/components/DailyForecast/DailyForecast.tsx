import './DailyForecast.scss';
import { getSchemaWeather } from '../IconsForecast/IconsForecast'; 

// 1. Definimos que este componente recibe 'data' desde el padre
interface DailyForecastProps {
    data: any; // Puedes cambiar 'any' por tu tipo 'WeatherData' si lo tienes importado
}

function DailyForecast({ data }: DailyForecastProps) {

    // 2. La validación ahora solo vigila la prop entrante
    if (!data || !data.daily || !data.daily.time) {
        return <div className='lastContainer' style={{ color: '#fff' }}>Cargando pronóstico...</div>;
    }

    const formatDayName = (dateString: string) => {
        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className='lastContainer'>
            {data.daily.time.map((timeString: string, index: number) => {
                const dayName = formatDayName(timeString);
                const currentCode = data.daily.weather_code?.[index];
                const { icon, text } = getSchemaWeather(currentCode);

                const maxTemp = data.daily.temperature_2m_max?.[index] !== undefined 
                    ? `${Math.round(data.daily.temperature_2m_max[index])}°` 
                    : '--';
                const minTemp = data.daily.temperature_2m_min?.[index] !== undefined 
                    ? `${Math.round(data.daily.temperature_2m_min[index])}°` 
                    : '--';

                return (
                    <div key={timeString} className="containerForecast">
                        <span className='daysWeek'>{dayName}</span>
                        <span className='weatherVisual' title={text}>{icon}</span>
                        <div className="gradue">
                            <span className='maxTemp'>{maxTemp}</span>
                            <span className='minTemp'>{minTemp}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DailyForecast;

