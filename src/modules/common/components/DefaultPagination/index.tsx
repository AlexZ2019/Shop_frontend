import { Pagination } from "antd";
import { useState } from "react";
import { OperationVariables, QueryLazyOptions } from "@apollo/client";

const DefaultPagination = ({ total, getNewPage }: { total: number, getNewPage: (options?: (QueryLazyOptions<OperationVariables> | undefined)) => void }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(9);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    getNewPage({ variables: { page }});
  }

  return <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={onPageChange} />
}

export default DefaultPagination;
