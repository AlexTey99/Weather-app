
import './App.scss'
import { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import SelectAdjust from './components/SelectAdjust/SelectAdjust'
import SelectDayWeek from '../src/components/Select/Select'
import logoHeader from './design/images/logo.svg'
import iconSetting from './design/images/icon-units.svg'
import { useFetchWeather } from './hooks/useFetchWeather';

function App() {
  const APIURL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Select day');
  const { data } = useFetchWeather(APIURL)
  console.log(data)

  const switchSelect = (param: boolean) => {
    setOpen(!param)
  }

  return (
    <div className="mainContainer">

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


      <div className="containerTittleAndSeeker">
        <h1>How's the sky looking today?</h1>

        <form className="search">

          <input
            type="search"
            id="search-input"
            name="q"
            placeholder="Search for a place..."
          />

          <button type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="containerTheTime">
        <div className="containerInfoTime"></div>
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
        </div>
      </div>

    </div>

  )
}

export default App
