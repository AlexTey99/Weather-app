
function SelectAdjust() {

    return (
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
    )

}

export default SelectAdjust


