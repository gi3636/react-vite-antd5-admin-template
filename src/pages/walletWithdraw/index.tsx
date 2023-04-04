import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from './tableData';
import useRequest from '@/hooks/useRequest';
import { getWithdrawRecordList } from '@/api/subUser';

const WalletWithdraw: React.FC = () => {
  const [data, setData] = useState<DataItem>(defaultData);
  const { loading, run } = useRequest();

  useEffect(() => {
    onSearch(defaultParams);
  }, []);

  const onSearch = (values) => {
    values.time = values.time?.map((item) => item.format('YYYY-MM-DD HH:mm:ss'));
    loadDataSource(values);
  };

  const loadDataSource = async (param?) => {
    let res = await run(getWithdrawRecordList({ ...param }));
    setData(res.data);
  };

  let tableProps: IProTableProps = {
    data: {
      list: data?.list,
      page: {
        currentPage: data?.page?.currentPage || 0,
        totalPage: data?.page?.totalPage || 0,
        total: data?.page?.total || 0,
      },
    },
    tableProps: {
      columns,
      bordered: true,
      loading,
    },
    searchFields: searchSchema,
    onSearch: onSearch,
  };

  return (
    <div>
      <ProTable {...tableProps} />
    </div>
  );
};

export default WalletWithdraw;
