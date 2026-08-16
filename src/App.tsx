
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
              <button>Switch to imperial</button>

              <p>Temperature</p>

              <button>Celsius (°C) ✓</button>
              <button>Fahrenheit (°F)</button>

              <p>Wind Speed</p>

              <button>km/h ✓</button>
              <button>mph</button>

              <p>Precipitation</p>

              <button>Milimeters</button>
            </div>
          )}
        </div>

      </div>

    </div>

  )
}

export default App
