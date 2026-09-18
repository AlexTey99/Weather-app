
import './App.scss'
import { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import SelectAdjust from './components/SelectAdjust/SelectAdjust'
import SelectDayWeek from '../src/components/Select/Select'
import logoHeader from './design/images/logo.svg'
import iconSetting from './design/images/icon-units.svg'
import { useFetchWeather } from './hooks/useFetchWeather';
import WeatherIcon from './components/GetWeatherIcon/GetWeatherIcon';
import CurrentWeatherIcons from './components/CurrentWeatherIcons/CurrentWeatherIcons';
import CloudIcons from './components/CurrentWeatherIcons/CloudIcons';
import WeatherStats from './components/WeatherStats/WeatherStats';
import DailyForecast from './components/DailyForecast/DailyForecast';
import HandleSearchChange from './components/HandleSearchChange/HandleSearchChange';
import CountryAndDay from './components/CountryAndDay/CountryAndDay';
import { ErrorState } from './components/ErrorState/ErrorState';


function App() {
  const [latitud, setLatitud] = useState<number>(52.52);
  const [longitud, setLongitud] = useState<number>(13.41);

  const [selectedCountry, setSelectedCountry] = useState<string>('Berlin, Germany');
  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Select day');

  const [tempUnit, setTempUnit] = useState('celsius');
  const [windUnit, setWindUnit] = useState('kmh');
  const [precipUnit, setPrecipUnit] = useState('mm');
  console.log(tempUnit, windUnit, precipUnit)

  const APIURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weather_code`;

  const { data, loading, error, refetch } = useFetchWeather(APIURL);

  const switchSelect = (param: boolean) => {
    setOpen(!param);
  };

  const diaSeleccionadoIndex = data?.daily?.time ? data.daily.time.findIndex((fechaTexto) => {
    const nombreDia = new Date(fechaTexto).toLocaleDateString('en-US', { weekday: 'long' });
    return nombreDia === selectedDay;
  }) : 0;

  const indiceFinal = diaSeleccionadoIndex >= 0 ? diaSeleccionadoIndex : 0;



  return (
    <div className={`mainContainer ${loading ? 'isLoading' : ''}`}>

      <div className="centerContainer">

        <div className="headerContainer">
          <img src={logoHeader} alt="" />

          <div className='dropdownMenu'>
            <div className="containerIconsAndButton">
              <button className='menu' onClick={() => switchSelect(open)}>
                <img src={iconSetting} alt="" />Units
                <FiChevronDown className='arrowDown' /></button>
            </div>

            {open && (
              <SelectAdjust
                tempUnit={tempUnit}
                setTempUnit={setTempUnit}
                windUnit={windUnit}
                setWindUnit={setWindUnit}
                precipUnit={precipUnit}
                setPrecipUnit={setPrecipUnit}
              />
            )}
          </div>
        </div>

        {/* Evaluación del estado de error fuera del header */}
        {error ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <>
            <HandleSearchChange setLatitude={setLatitud} setLongitude={setLongitud} setCountryName={setSelectedCountry} />

            <div className="containerTheTime">
              <div className="containerInfoTime">

                <div className="topContainer">
                  {loading ? (
                    <div className="loadingContainer">
                      <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p style={{ color: 'white' }}>Loading...</p>
                    </div>
                  ) : (
                    <>
                      <CountryAndDay data={data} countryName={selectedCountry} dayIndex={indiceFinal} />

                      <CurrentWeatherIcons />
                      <CloudIcons />

                      <div className="contianerIconTemperature">
                        <div className="icon">
                          <WeatherIcon code={data?.current.weather_code ?? 0} />
                        </div>

                        <div className="temperature">
                          {indiceFinal === 0
                            ? `${data?.current.temperature_2m}°`
                            : `${data?.daily.temperature_2m_max[indiceFinal]}°`}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <WeatherStats
                  weatherData={data}
                  dayIndex={indiceFinal}
                  tempUnit={tempUnit}
                  windUnit={windUnit}
                  precipUnit={precipUnit}
                  loading={loading}
                />


                <h2 className='dailyForecast'>Daily Forecast</h2>
                <DailyForecast data={data} loading={loading} />

              </div>
              <div className="containerHourlyForecast">

                <div className="containerTittleAndSelect">
                  <h2>Hourly forecast</h2>

                  <div className="containerIconsAndButtonBelow">
                    <button className='buttonSelectWeek' onClick={() => setWeekDays(!weekDays)}>
                      {selectedDay}
                      <FiChevronDown className='arrowDown' /></button>
                  </div>

                  {weekDays && (
                    <SelectDayWeek
                      setSelectedDay={setSelectedDay}
                      setWeekDays={setWeekDays}
                    />
                  )}
                </div>

                <div className="containerHours">
                  {data?.hourly.temperature_2m
                    .slice(indiceFinal * 24, (indiceFinal + 1) * 24)
                    .map((temperature, index) => {
                      const horaActual = index;
                      const ampm = horaActual >= 12 ? 'PM' : 'AM';
                      const horaFormateada = `${horaActual % 12 || 12} ${ampm}`;

                      return (
                        <div key={index} className="containerHoursGrade">
                          {loading ? null : (
                            <>
                              <span>{horaFormateada}</span>
                              <span>{Math.round(temperature)}°</span>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        )}

      </div>



    </div>

  )
}

export default App
