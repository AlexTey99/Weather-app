import './HandleSearchChange.scss'
import React, { useState } from 'react'

function HandleSearchChange() {
    const ciudadesDePrueba = [
        { id: 1, name: 'Berlin, Germany' },
        { id: 2, name: 'Paris, France' },
        { id: 3, name: 'Madrid, Spain' },
    ];

    const [busqueda, setBusqueda] = useState('');
    const [sugerencias, setSugerencias] = useState<{ id: number, name: string }[]>([]);

   
    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusqueda(valor); 

       
        if (valor.trim() === '') {
            setSugerencias([]);
            return;
        }

        const filtradas = ciudadesDePrueba.filter(ciudad =>
            ciudad.name.toLowerCase().startsWith(valor.toLowerCase())
        );

        setSugerencias(filtradas);
    };

   return (
    <div className="containerTittleAndSeeker">
        <h1>How's the sky looking today?</h1>

        <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                id="search-input"
                name="q"
                value={busqueda}
                placeholder="Search for a place..."
                onChange={manejarCambio}
                autoComplete="off"
            />

            <button type="submit">
                Search
            </button>

            {sugerencias.length > 0 && (
                <div className="suggestionsBox">
                    {sugerencias.map((ciudad) => (
                        <div 
                            key={ciudad.id} 
                            className="suggestionItem"
                            onClick={() => {
                                setBusqueda(ciudad.name);
                                setSugerencias([]);       
                            }}
                        >
                            {ciudad.name}
                        </div>
                    ))}
                </div>
            )}
        </form>
    </div>
)

}

export default HandleSearchChange;


