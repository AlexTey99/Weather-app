import './SelectAdjust.scss'; // O el archivo de estilos que uses

// 1. Declaramos la interfaz obligatoria para TypeScript
interface SelectAdjustProps {
  tempUnit: string;
  setTempUnit: (unit: string) => void;
  windUnit: string;
  setWindUnit: (unit: string) => void;
  precipUnit: string;
  setPrecipUnit: (unit: string) => void;
}

// 2. Desestructuramos las 6 propiedades dentro de los argumentos de la función
function SelectAdjust({
  tempUnit,
  setTempUnit,
  windUnit,
  setWindUnit,
  precipUnit,
  setPrecipUnit
}: SelectAdjustProps) {

  return (
    <div className='popupWindow'>
      <h3>Switch to Imperial</h3>

      <p>Temperature</p>
      {/* Añadimos las clases dinámicas y los onClick con los nombres que Open-Meteo entiende */}
      <button 
        className={tempUnit === 'celsius' ? 'selected' : ''} 
        onClick={() => setTempUnit('celsius')}
      >
        Celsius (°C)
      </button>
      <button 
        className={tempUnit === 'fahrenheit' ? 'selected' : ''} 
        onClick={() => setTempUnit('fahrenheit')}
      >
        Fahrenheit (°F)
      </button>

      <div className="separator"></div>

      <p>Wind Speed</p>
      <button 
        className={windUnit === 'kmh' ? 'selected' : ''} 
        onClick={() => setWindUnit('kmh')}
        style={{height: '34px'}}
      >
        km/h
      </button>
      <button 
        className={windUnit === 'mph' ? 'selected' : ''} 
        onClick={() => setWindUnit('mph')}
      >
        mph
      </button>

      <div className="separator"></div>

      <p>Precipitation</p>
      <button 
        className={precipUnit === 'mm' ? 'selected' : ''} 
        onClick={() => setPrecipUnit('mm')}
      >
        Millimeters (mm)
      </button>
      <button 
        className={precipUnit === 'inch' ? 'selected' : ''} 
        onClick={() => setPrecipUnit('inch')}
      >
        Inches (in)
      </button>
    </div>
  );
}

export default SelectAdjust;



