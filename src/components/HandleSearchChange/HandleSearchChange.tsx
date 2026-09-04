import './HandleSearchChange.scss'
import { useState } from 'react'
import { CountriesWorld } from '../Countrys/Countrys'
import type { Countries } from '../Countrys/Countrys'

interface HandleSearchChangeProps {
    setLatitude: (lat: number) => void;
    setLongitude: (lon: number) => void;
}

function HandleSearchChange({ setLatitude, setLongitude }: HandleSearchChangeProps) {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<Countries[]>([]);
    console.log('Suggestions:', search);

    const cleanText = (text: string) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        const cleanedValue = cleanText(value);

        const filtered = CountriesWorld.filter(country => {
            const cleanedCountryName = cleanText(country.name);
            return cleanedCountryName.startsWith(cleanedValue);
        });

        setSuggestions(filtered);
    };

    return (
        <div className="containerTittleAndSeeker">
            <h1>How's the sky looking today?</h1>

            <form 
                className="search" 
                onSubmit={(e) => {
                    e.preventDefault();
                    
                    if (suggestions.length > 0) {
                        const firstCountry = suggestions[0];
                        
                        setSearch(firstCountry.name);
                        setLatitude(firstCountry.latitude);
                        setLongitude(firstCountry.longitude);
                        setSuggestions([]);
                    }
                }}
            >
                <input
                    type="text"
                    id="search-input"
                    name="q"
                    value={search}
                    placeholder="Search for a place..."
                    onChange={handleChange}
                    autoComplete="off"
                />

                <button type="submit">
                    Search
                </button>

                {suggestions.length > 0 && (
                    <div className="suggestionsBox">
                        {suggestions.map((country) => (
                            <div
                                key={country.id}
                                className="suggestionItem"
                                onClick={() => {                                    
                                    setSearch(country.name);
                                    setLatitude(country.latitude);
                                    setLongitude(country.longitude);                                  
                                    setSuggestions([]);
                                }}
                            >
                                {country.name}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}

export default HandleSearchChange;



