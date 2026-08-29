import './WeatherStats.scss';

interface StatItem {
    title: string;
    value: string;
}


function WeatherStats() {

    const stats = [
        { title: 'Feels Like', value: '64°' },
        { title: 'Humidity', value: '46%' },
        { title: 'Wind', value: '9 mph' },
        { title: 'Precipitation', value: '0 in' }
    ];

    return (
        <div className='midleContainer'>
            {
                stats.map((stat: StatItem) => (
                    <div key={stat.title} className='receivingData'>
                        <span>{stat.title}</span>
                        <span>{stat.value}</span>                 
                    </div>
                ))
            }
        </div>



    )
}

export default WeatherStats


