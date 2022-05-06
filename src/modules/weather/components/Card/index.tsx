import { Card, Modal, notification } from 'antd';
import { FC, useState } from 'react';
import { WEATHER_QUERY } from '../../graphql/queries/getWeather';
import { useQuery } from '@apollo/client';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_CITY_MUTATION } from '../../../city/graphql/mutations/deleteCity';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { client } from '../../../../providers/apollo/config';
import Meta from 'antd/es/card/Meta';
import mainStyles from '../../../common/styles/index.module.css';
import styles from './index.module.css';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import temperature from '../../../../assets/images/temperature.png';

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

type Props = {
  cityId: string
}
const WeatherCard: FC<Props> = ({cityId}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [deleteCity] = useMutation(DELETE_CITY_MUTATION);
  const handleDeleteCity = async (cityId: string) => {
    await deleteCity({
      variables: { userId: user.getUser.id, cityId: cityId },
      update(cache) {
        cache.modify({
          fields: {
            getUserCitiesId(existingCityIdRefs) {
              return existingCityIdRefs.filter((id: string) => id !== cityId);
            }
          }
        });
      }
    });
  };

  const handleOk = async (cityId: string) => {
    setIsModalVisible(false);
    try {
      await handleDeleteCity(cityId);
      notification.success({
        message: 'The city has been deleted'
      });
    } catch {
      notification.error({
        message: 'The city hasn\'t been deleted'
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const currentDate = new Date();
  const user = client.readQuery({
    query: USER_QUERY
  });
  const { data, loading } = useQuery(WEATHER_QUERY, {
    variables: { cityId }
  });

  return (
    <Card loading={loading} className={styles['ant-card']}>
      {data?.getWeather ? (
          <>
            <Meta
              className={styles.info}
              description={
                <>
                  <div>{data.getWeather.name}</div>
                  {`${data.getWeather.state} 
                ${data.getWeather.country} `}
                  <DeleteOutlined onClick={showModal} />
                  <Modal
                    title='Do you want to delete the city?'
                    visible={isModalVisible}
                    onOk={() => handleOk(cityId)}
                    onCancel={handleCancel}
                  />
                </>
              }
            />
            <div className={`${mainStyles.displayGrid} ${styles.otherDaysCard}`}>
              {data.getWeather.weatherForecast.map((day: Day, index: number) => {
                if (index < 4) {
                  currentDate.setDate(currentDate.getDate() + index);
                  return (
                    <Card className={styles['ant-card']} key={index}>
                      <div className={styles.dayInfo}>
                        {currentDate.toLocaleDateString('en-us', { weekday: 'short' })}
                      </div>
                      <div>
                        <div className={styles.weatherDescription}>{day.weather.description}</div>
                        <div>
                          <img
                            className={styles.weatherImg}
                            src={getWeatherIcon(day.weather.main)}
                            alt='weather image'
                          />
                        </div>
                      </div>
                      <div className={styles.temperature}>
                        <div>
                          <img src={temperature} alt='temperature' />
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
        ) :
        null
      }
    </Card>
  );
};

export default WeatherCard;
