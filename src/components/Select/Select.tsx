import type { Dispatch, SetStateAction } from 'react';

interface SelectDayWeekProps {
    setSelectedDay: Dispatch<SetStateAction<string>>;
    setWeekDays: Dispatch<SetStateAction<boolean>>;
}

function SelectDayWeek({ setSelectedDay,setWeekDays }: SelectDayWeekProps) {

    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    const handleSelectDay = (day: string) => {
        setSelectedDay(day);
        setWeekDays(false);
    };

    return (
        <div className='dropdownMenu'>
            {days.map((day) => (
                <button
                    key={day}
                    onClick={() => handleSelectDay(day)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}

export default SelectDayWeek;