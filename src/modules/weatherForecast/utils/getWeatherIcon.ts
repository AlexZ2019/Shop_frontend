import clouds from '../assets/images/clouds.png';
import rain from '../assets/images/rain.png';
import clear from '../assets/images/clear.png';

export const getWeatherIcon = (dailyWeatherForecast: string) => {
  switch (dailyWeatherForecast) {
    case 'Clouds': {
      return clouds;
    }
    case 'Rain': {
      return rain;
    }
    case 'Snow': {
      return rain;
    }
    default: {
      return clear;
    }
  }
};
