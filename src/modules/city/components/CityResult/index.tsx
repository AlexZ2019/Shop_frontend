import { City } from '../../../weatherForecast/types';
import { Button, List } from 'antd';
import { FC } from 'react';

type Props = City & {addCityHandler: (city: City) => void, loading: boolean}


const CityResult: FC<Props> = ({addCityHandler, loading, ...city}) => {

  return (
    <List.Item>
      <List.Item.Meta
        title={city.name}
        description={
        <>
          <div>State: {city.state}</div>
          <div>Country: {city.country}</div>
        </>
      }
      />
      <Button onClick={() => addCityHandler(city)} disabled={loading}>
        Add
      </Button>
    </List.Item>
  )
}

export default CityResult
