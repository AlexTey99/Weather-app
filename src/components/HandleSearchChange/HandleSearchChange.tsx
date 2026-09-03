import './HandleSearchChange.scss'
import { useState } from 'react'
// Importamos también el tipo 'Countries' para que TypeScript esté contento
import { CountriesWorld } from '../Countrys/Countrys'
import type { Countries } from '../Countrys/Countrys'

interface HandleSearchChangeProps {
    setLatitud: (lat: number) => void;
    setLongitud: (lon: number) => void;
}

// Recibimos las funciones de App.tsx mediante Props para poder cambiar el clima
function HandleSearchChange({ setLatitud, setLongitud }: HandleSearchChangeProps) {
    const [busqueda, setBusqueda] = useState('');
    // Tipamos el estado con tu interfaz Countries[]
    const [sugerencias, setSugerencias] = useState<Countries[]>([]);

    // 🌟 ENVOLVEMOS EL CÓDIGO SUELTO: Creamos la función que el onChange necesita
    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBusqueda(valor);

        if (valor.trim() === '') {
            setSugerencias([]);
            return;
        }

        // Buscamos dentro de los 20 países locales
        const filtrados = CountriesWorld.filter(country =>
            country.name.toLowerCase().startsWith(valor.toLowerCase())
        );

        setSugerencias(filtrados);
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
                    onChange={manejarCambio} // Ahora sí coincide con la función de arriba
                    autoComplete="off"
                />

                <button type="submit">
                    Search
                </button>

                {sugerencias.length > 0 && (
                    <div className="suggestionsBox">
                        {sugerencias.map((pais) => (
                            <div
                                key={pais.id}
                                className="suggestionItem"
                                onClick={() => {
                                    // 1. Escribimos el nombre en el cuadro de búsqueda
                                    setBusqueda(pais.name);

                                    // 2. 🌟 ¡EL TRUCO FINAL! Cambiamos las coordenadas en App.tsx
                                    setLatitud(pais.latitude);
                                    setLongitud(pais.longitude);

                                    // 3. Cerramos el desplegable
                                    setSugerencias([]);
                                }}
                            >
                                {/* Opcional: Puedes poner {pais.flag} al lado si quieres ver las letras de los países que guardaste */}
                                {pais.name}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}

export default HandleSearchChange;

