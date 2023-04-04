import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from './tableData';
import useRequest from '@/hooks/useRequest';
import { getSubUserList } from '@/api/subUser';

const SubUser: React.FC = () => {
  const [data, setData] = useState<any>(defaultData);
  const { loading, run } = useRequest();

  useEffect(() => {
    loadDataSource(defaultParams);
  }, []);

  const loadDataSource = async (param?) => {
    let res = await run(getSubUserList(param));
    setData(res.data);
  };

  const onSearch = (values) => {
    if (values.time) {
      values.time = values.time.map((item) => item.format('YYYY-MM-DD HH:mm:ss'));
    }
    loadDataSource(values);
  };

  let tableProps: IProTableProps = {
    data: {
      list: data?.list?.list || [],
      page: {
        currentPage: data?.page?.currentPage || 0,
        totalPage: data?.page?.totalPage || 0,
        total: data?.page?.total || 0,
      },
    },
    tableProps: {
      columns,
      bordered: true,
      footer: () => <div>我的佣金：{data?.list?.sum}</div>,
      loading,
    },
    searchFields: searchSchema,
    onSearch: onSearch,
  };

  return <ProTable {...tableProps} />;
};

export default SubUser;
