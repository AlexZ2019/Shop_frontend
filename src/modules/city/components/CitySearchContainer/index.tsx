import { Fragment } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_CITY_QUERY } from '../../graphql/queries/findCity';
import { SubmitHandler } from 'react-hook-form';
import Search from '../../../common/components/Search';
import SpinnerWrapper from '../../../common/components/SpinnerWrapper';
import CitySearchResults from '../CitySearchResults';

const CitySearchContainer = () => {
  const [findCity, { loading, data }] = useLazyQuery(FIND_CITY_QUERY);
  const onSubmit: SubmitHandler<{ search: string }> = async (data) => {
    await findCity({ variables: { city: data.search } });
  };

  return (
    <Fragment>
      <Search loading={loading} onSubmit={onSubmit} placeholder="Search city" />
      <SpinnerWrapper loading={loading} data={data && data.findCity || null}
                      Component={CitySearchResults} />
    </Fragment>
  )
}
export default CitySearchContainer
