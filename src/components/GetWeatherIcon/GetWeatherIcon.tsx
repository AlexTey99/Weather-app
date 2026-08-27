

type WeatherIconProps = {
  code: number;
};

const WeatherIcon = ({ code }: WeatherIconProps) => {
  if (code === 0) {
    return <span>☀️</span>;
  }

  if (code === 1) {
    return <span>🌤️</span>;
  }

  if (code === 2) {
    return <span>⛅</span>;
  }

  if (code === 3) {
    return <span>☁️</span>;
  }

  if (code >= 51 && code <= 67) {
    return <span>🌧️</span>;
  }

  if (code >= 71 && code <= 77) {
    return <span>❄️</span>;
  }

  if (code >= 80 && code <= 82) {
    return <span>🌦️</span>;
  }

  if (code >= 95) {
    return <span>⛈️</span>;
  }

  return <span>🌤️</span>;
};

export default WeatherIcon;