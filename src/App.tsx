
import './App.scss'
import { useState } from 'react';

import { FiChevronDown } from "react-icons/fi";


import logoHeader from './design/images/logo.svg'
import iconSetting from './design/images/icon-units.svg'

function App() {
  const [abierto, setAbierto] = useState(false);


  return (
    <div className="mainContainer">

      <div className="headerContainer">
        <img src={logoHeader} alt="" />

        <div className='dropdownMenu'>
          <div className="containerIconsAndButton">
            <button className='menu' onClick={() => setAbierto(!abierto)}>
              <img src={iconSetting} alt="" />Units
              <FiChevronDown className='arrowDown' /></button>
          </div>

          {abierto && (
            <div className='popupWindow'>
              <button>Switch to Imperial</button>

              <p>Temperature</p>
              <button className="selected">Celsius (°C)</button>
              <button>Fahrenheit (°F)</button>

              <div className="separator"></div>

              <p>Wind Speed</p>
              <button className="selected">km/h</button>
              <button>mph</button>

              <div className="separator"></div>

              <p>Precipitation</p>
              <button className="selected">Millimeters (mm)</button>
            </div>
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
    </div>

  )
}

export default App
