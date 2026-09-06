import './CountryAndDay.scss'

interface CountryAndDayProps {
    data: any; 
    countryName: string;
    dayIndex?: number;
}

const CountryAndDay = ({ data, countryName, dayIndex }: CountryAndDayProps) => {
    const getFormattedDate = () => {
        if (!data?.timezone || (!data?.current?.time && !data?.daily?.time)) return "Loading date...";

        try {
            const isToday = !dayIndex || dayIndex === 0;
            const rawDateTime = isToday ? data.current.time : data.daily.time[dayIndex];
            const [datePart, timePart = '00:00'] = rawDateTime.split('T');
            const [year, month, day] = datePart.split('-').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);

            const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
            
            return utcDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: data.timezone
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid date";
        }
    };

    return (
        <div className="countryAndDay">
            <h2>{countryName || "Select a location..."}</h2>
            <p>{(data?.current?.time || data?.daily?.time) ? getFormattedDate() : "Loading date..."}</p>
        </div>
    )
}

export default CountryAndDay;




