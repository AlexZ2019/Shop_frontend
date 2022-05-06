import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_CITY_QUERY } from '../../graphql/queries/findCity';
import { SubmitHandler } from 'react-hook-form';
import CitySearch from '../CitySearch';

const CitySearchContainer = () => {
  const [findCity, { data, loading }] = useLazyQuery(FIND_CITY_QUERY);
  const onSubmit: SubmitHandler<{ search: string }> = async (data) => {
    await findCity({ variables: { city: data.search } });
  };

  return (
    <>
      <CitySearch data={data ? data.findCity : null} searchLoading={loading} onSubmit={onSubmit} />
    </>
  );
};
export default CitySearchContainer;
