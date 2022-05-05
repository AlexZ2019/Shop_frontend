import { USER_CITIES_ID_QUERY } from '../../../city/graphql/queries/getUserCitiesId';
import SpinnerWrapper from '../../../common/components/SpinnerWrapper';
import WeatherCities from '../WeatherCities';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { useLazyQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';

const WeatherCitiesContainer = () => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [getUserCitiesId, { data, loading }] = useLazyQuery(USER_CITIES_ID_QUERY);

  useEffect(() => {
    if (user && user.getUser) {
      (async () => {
        await getUserCitiesId({ variables: { userId: user.getUser.id } });
      })();
    }
  }, [user]);

  return (
    <div>
      <SpinnerWrapper
        loading={loading}
        data={(data && data.getUserCitiesId) || null}
        Component={WeatherCities}
        emptyDivClasses={null}
      />
    </div>
  );
};

export default WeatherCitiesContainer;
