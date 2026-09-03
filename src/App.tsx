
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

function App() {
  const APIURL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weather_code";

  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Select day');
  const { data } = useFetchWeather(APIURL)
  const hourlysDay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

  const switchSelect = (param: boolean) => {
    setOpen(!param)
  }

  return (
    <div className="mainContainer">

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
              <SelectAdjust />
            )}
          </div>

        </div>


        <HandleSearchChange />

        <div className="containerTheTime">
          <div className="containerInfoTime">
            <div className="topContainer">

              <div className="countryAndDay">
                <h2>Berlin, Germany</h2>
                <p>
                  {new Date(data?.current.time ?? new Date()).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              </div>

              <CurrentWeatherIcons />
              <CloudIcons />

              <div className="contianerIconTemperature">

                <div className="icon">
                  <WeatherIcon code={data?.current.weather_code ?? 0} />
                </div>

                <div className="temperature">
                  {data?.current.temperature_2m}°
                </div>

              </div>

            </div>

            <WeatherStats weatherData={data} />

            <h2 className='dailyForecast'>Daily Forecast</h2>
            <DailyForecast data={data} />

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

              {data?.hourly.temperature_2m.slice(0, 24).map((temperature, index) => (
                <div className="containerHoursGrade" key={index}>
                  <div className="hours">
                    <WeatherIcon code={data.hourly.weather_code[index]} />
                    {hourlysDay[index]} PM
                  </div>

                  {temperature}°
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>



    </div>

  )
}

export default App
