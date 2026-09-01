

// Diccionario basado en los códigos oficiales de la API de Open-Meteo
const weatherMap: Record<number, { text: string; icon: string }> = {
    0: { text: 'Despejado', icon: '☀️' },
    1: { text: 'Principalmente despejado', icon: '🌤️' },
    2: { text: 'Parcialmente nublado', icon: '⛅' },
    3: { text: 'Nublado', icon: '☁️' },
    45: { text: 'Niebla', icon: '🌫️' },
    48: { text: 'Niebla con escarcha', icon: '🌫️' },
    51: { text: 'Llovizna ligera', icon: '🌦️' },
    53: { text: 'Llovizna moderada', icon: '🌧️' },
    55: { text: 'Llovizna intensa', icon: '🌧️' },
    61: { text: 'Lluvia débil', icon: '🌦️' },
    63: { text: 'Lluvia moderada', icon: '🌧️' },
    65: { text: 'Lluvia fuerte', icon: '🌧️' },
    71: { text: 'Nevada ligera', icon: '🌨️' },
    73: { text: 'Nevada moderada', icon: '🌨️' },
    75: { text: 'Nevada fuerte', icon: '❄️' },
    77: { text: 'Granizo', icon: '🌨️' },
    80: { text: 'Chubascos ligeros', icon: '🌦️' },
    81: { text: 'Chubascos moderados', icon: '🌧️' },
    82: { text: 'Chubascos violentos', icon: '⛈️' },
    95: { text: 'Tormenta eléctrica', icon: '⛈️' },
    96: { text: 'Tormenta con granizo ligero', icon: '⛈️' },
    99: { text: 'Tormenta con granizo fuerte', icon: '⛈️' },
};

// Función que recibe el código y retorna el texto y el icono seguro
export function getSchemaWeather(code: number | undefined) {
    if (code === undefined || !weatherMap[code]) {
        return { text: 'Desconocido', icon: '❓' };
    }
    return weatherMap[code];
}
