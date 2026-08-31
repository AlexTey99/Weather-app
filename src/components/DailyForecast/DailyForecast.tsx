import './DailyForecast.scss'
interface TypeArray {
    day: string;
    icon: string;
    left: string;
    right: string;
}

function DailyForecast() {

    const forecast: TypeArray[] = [
        { day: 'Tue', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Wed', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Thu', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Fri', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Sat', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Sun', icon: 'icon', left: 'left', right: 'right' },
        { day: 'Mon', icon: 'icon', left: 'left', right: 'right' },
    ]

    return (
        <div className='lastContainer'>
            {forecast.map((item: TypeArray) => (
                <div key={item.day} className="containerForecast">
                    <span className='daysWeek'>{item.day}</span>
                    <span>{item.icon}</span>
                    <div className="gradue">
                        <span>{item.left}</span>
                        <span>{item.right}</span>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default DailyForecast