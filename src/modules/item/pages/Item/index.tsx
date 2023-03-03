import { Button, Image } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ITEM_QUERY } from "../../graphql/queries/item";
import defaultItemImg from '../../../../assets/images/item_default.png';
import Spiner from "../../../common/components/Spinner";

const Item = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data, loading } = useQuery(ITEM_QUERY, {
    variables: { id: Number(id) }
  });
  if (loading) {
    return <Spiner spinnerType='main' customStyles=''/>
  }
  return <div>
    <div>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
    <Image width={300} src={data?.getItem?.image || defaultItemImg}/>
    <h3>{data?.getItem?.title}</h3>
    <p>{data?.getItem?.description}</p>
  </div>
};

export default Item;
