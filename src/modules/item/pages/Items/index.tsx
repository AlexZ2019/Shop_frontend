import { useLazyQuery } from "@apollo/client";
import { ITEMS_QUERY } from "../../graphql/queries/Items";
import { useEffect } from "react";
import { Alert, Col, Row, Spin, Image, Pagination } from "antd";
import { IItem } from "../../types";
import itemDefaultImg from '../../../../assets/images/item_default.png';
import Spiner from "../../../common/components/Spinner";
import DefaultPagination from "../../../common/components/DefaultPagination";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import routePaths from "../../../../constants/routePaths";

const Items = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const [getItems, { loading, data }] = useLazyQuery(ITEMS_QUERY);

  useEffect(() => {
    getItems({ variables: { page: 1 }});
  }, []);

  const showItem = (id: number) => {
    searchParams.set('id', String(id));
    navigate({
      pathname: routePaths.item,
      search: createSearchParams({
        id: String(id)
      }).toString()
    })
  }

  return (
    <div>
      <Row>
        {data?.getItems?.items?.length
          && data?.getItems?.items.map((item: IItem) => {
            return <Col span={8} key={item.id} onClick={() => showItem(item.id)}>
              <Image preview={false}
                     width={150}
                     src={item?.image || itemDefaultImg}
              />
              <h3>{item.title}</h3>
            </Col>
          })
        }
        {Array.isArray(!data?.getItems?.items) && !data?.getItems?.items?.length
          && <Alert message='No item fount' type='warning'/>}
        {loading && <Spiner spinnerType='main' customStyles=""/>}
      </Row>
      <DefaultPagination total={data?.getItems?.total} getNewPage={getItems}/>
    </div>
  );
};

export default Items;
