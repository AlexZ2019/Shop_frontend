import { Card } from 'antd';
import { FC } from 'react';
import { CityId } from '../../types';
import { WEATHER_FORECAST_QUERY } from '../../graphql/queries/getWeatherForecast';
import { useQuery } from '@apollo/client';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CITY_MUTATION } from '../../../city/graphql/mutations/deleteCity';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { client } from '../../../../providers/apollo/config';
import Meta from 'antd/es/card/Meta';
import mainStyles from '../../../index.module.css';
import styles from './index.module.css';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import temperature from '../../assets/images/temperature.png';

type Day = {
  humidity: number;
  temp: {
    tempDay: number;
    tempNight: number;
  };
  weather: {
    main: string;
    description: string;
  };
  windSpeed: number;
};

const WeatherCard: FC<CityId> = ({ cityId }) => {
  let now = new Date();
  const user = client.readQuery({
    query: USER_QUERY
  });
  const { data, loading } = useQuery(WEATHER_FORECAST_QUERY, {
    variables: { cityId }
  });
  const [deleteCity] = useMutation(DELETE_CITY_MUTATION);
  const deleteCityHandle = async (cityId: string) => {
    await deleteCity({
      variables: { userId: +user.getUser.userId, cityId: +cityId },
      update(cache) {
        cache.modify({
          fields: {
            getUserCitiesId(existingCityIdRefs) {
              return existingCityIdRefs.filter((id: CityId) => id.cityId !== cityId);
            }
          }
        });
      }
    });
  };

  return (
    <Card loading={loading} className={styles['ant-card']}>
      {data && data.getCityWeatherForecast ? (
        <>
          <Meta
            className={styles.info}
            description={
              <>
                <div>{data.getCityWeatherForecast.name}</div>
                {`${data.getCityWeatherForecast.state} 
         ${data.getCityWeatherForecast.country} `}
                <DeleteOutlined onClick={() => deleteCityHandle(cityId)} />
              </>
            }
          />
          <div className={`${mainStyles.displayGrid} ${styles.otherDaysCard}`}>
            {data.getCityWeatherForecast.weatherForecast.map((day: Day, index: number) => {
              if (index < 4) {
                let dayDate = now;
                dayDate.setDate(now.getDate() + index);
                return (
                  <Card className={styles['ant-card']}>
                    <div className={styles.dayInfo}>
                      {dayDate.toLocaleDateString('en-us', { weekday: 'short' })}
                    </div>
                    <div>
                      <div className={styles.weatherDescription}>{day.weather.description}</div>
                      <div>
                        <img
                          className={styles.weatherImg}
                          src={getWeatherIcon(day.weather.main)}
                          alt="weather image"
                        />
                      </div>
                    </div>
                    <div className={styles.temperature}>
                      <div>
                        <img src={temperature} alt="temperature" />
                      </div>
                      <div>
                        <div className={styles.tempDay}>{day.temp.tempDay} ℃</div>
                        <div className={styles.tempNight}>{day.temp.tempNight} ℃</div>
                      </div>
                    </div>
                  </Card>
                );
              }
            })}
          </div>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default WeatherCard;
