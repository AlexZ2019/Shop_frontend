import { FIND_CITY_QUERY } from '../../graphql/queries/findCity';
import { SubmitHandler } from 'react-hook-form';
import CitySearch from '../CitySearch';
import { client } from '../../../../providers/apollo/config';
import { USER_QUERY } from '../../../user/graphql/queries/getUser';
import { useLazyQuery } from '@apollo/client';

const CitySearchContainer = () => {
  const user = client.readQuery({
    query: USER_QUERY
  });
  const [findCity, { data, loading, error }] = useLazyQuery(FIND_CITY_QUERY);
  const onSubmit: SubmitHandler<{ search: string }> = async (data) => {
    if (data.search.length > 1) {
      await findCity({ variables: { city: data.search, userId: user.getCurrentUser.id } });
    }
  };

  return (
    <>
      <CitySearch data={data ? data.findCity : null} searchLoading={loading} onSubmit={onSubmit} searchError={error} />
    </>
  );
};
export default CitySearchContainer;
