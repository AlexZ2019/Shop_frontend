import { CITIES_IDS_QUERY } from '../../../city/graphql/queries/getCitiesIds';
import SpinnerWrapper from '../../../common/components/SpinnerWrapper';
import WeatherCities from '../Cities';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { useLazyQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';

const WeatherCitiesContainer = () => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [getCitiesId, { data, loading }] = useLazyQuery(CITIES_IDS_QUERY);
  useEffect(() => {
    if (user?.getUser) {
      (async () => {
        await getCitiesId({ variables: { userId: user.getUser.id } });
      })();
    }
  }, [user]);

  return (
    <div>
      <SpinnerWrapper
        loading={loading}
        componentProps={data ? {data: data.getCitiesIds} : null}
        Component={WeatherCities}
        emptyDivClasses={null}
      />
    </div>
  );
};

export default WeatherCitiesContainer;
