import { CITIES_IDS_QUERY } from '../../../city/graphql/queries/getCitiesIds';
import ComponentWrapper from '../../../common/components/SpinnerWrapper';
import WeatherCities from '../Cities';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

const WeatherCitiesContainer = () => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [getCitiesId, { data, loading }] = useLazyQuery(CITIES_IDS_QUERY);
  useEffect(() => {
    if (user?.getCurrentUser) {
      (async () => {
        await getCitiesId({ variables: { userId: user.getCurrentUser.id } });
      })();
    }
  }, [user]);

  return (
    <div>
      <ComponentWrapper
        loading={loading}
        componentProps={data ? {data: data.getCitiesIds} : null}
        Component={WeatherCities}
        emptyDivClasses={null}
      />
    </div>
  );
};

export default WeatherCitiesContainer;
