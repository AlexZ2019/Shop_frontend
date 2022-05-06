import TopBar from '../../../common/components/topBar';
import CitySearchContainer from '../../../city/components/CitySearchContainer';
import WeatherCitiesContainer from '../../components/CitiesContainer';

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
