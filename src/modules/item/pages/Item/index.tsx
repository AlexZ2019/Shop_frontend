import { Button, Image } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ITEM_QUERY } from "../../graphql/queries/item";
import defaultItemImg from '../../../../assets/images/item_default.png';
import Spiner from "../../../common/components/Spinner";
import styles from "./index.module.css"
import { LeftSquareFilled } from "@ant-design/icons";

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
  return <div className={styles.item}>
    <div>
      <LeftSquareFilled onClick={() => navigate(-1)} className={styles.backIcon}/>
    </div>
    <Image src={data?.getItem?.image || defaultItemImg} className={styles.img} preview={false}/>
    <h2>{data?.getItem?.title}</h2>
    <p>{data?.getItem?.description}</p>
  </div>
};

export default Item;
