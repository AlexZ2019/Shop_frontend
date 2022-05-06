import clouds from '../../../assets/images/clouds.png';
import rain from '../../../assets/images/rain.png';
import clear from '../../../assets/images/clear.png';
import snow from '../../../assets/images/snow.png';

export const getWeatherIcon = (dailyWeatherForecast: string) => {
  switch (dailyWeatherForecast) {
    case 'Clouds': {
      return clouds;
    }
    case 'Rain': {
      return rain;
    }
    case 'Snow': {
      return snow;
    }
    default: {
      return clear;
    }
  }
};
