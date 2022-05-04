import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_CITY_QUERY } from '../../graphql/queries/findCity';
import { SubmitHandler } from 'react-hook-form';
import CitySearchResults from '../CitySearchResults';

const CitySearchContainer = () => {
  const [findCity, { data }] = useLazyQuery(FIND_CITY_QUERY);
  const onSubmit: SubmitHandler<{ search: string }> = async (data) => {
    await findCity({ variables: { city: data.search } });
  };

  return (
    <>
      <CitySearchResults data={data ? data.findCity : null} onSubmit={onSubmit} />
    </>
  );
};
export default CitySearchContainer;
