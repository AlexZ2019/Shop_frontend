import TopBar from '../../common/components/topBar';
import CitySearchContainer from '../components/CitySearchContainer';
import WeatherCitiesContainer from '../components/WeatherCitiesContainer';

const WeatherForecast = () => {

  return (
    <div>
      <TopBar />
      <CitySearchContainer />
      <WeatherCitiesContainer />
    </div>
  );
};

export default WeatherForecast;
