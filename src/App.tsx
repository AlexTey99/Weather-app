
import './App.scss'
import { useState } from 'react';



import logoHeader from './design/images/logo.svg'

function App() {
  const [abierto, setAbierto] = useState(false);


  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <img src={logoHeader} alt="" />

        <div className='dropdownMenu'>
          <button className='menu' onClick={() => setAbierto(!abierto)}>Units ↓</button>

          {abierto && (
            <div>
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
