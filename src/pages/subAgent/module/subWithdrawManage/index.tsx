import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { getColumns, searchSchema } from './tableData';
import useRequest from '@/hooks/useRequest';
import { getSubAgentWithdrawList } from '@/api/subUser';
import { useSelector } from '@/store';
import { Form } from 'antd';

const SubWithdrawManage: React.FC = () => {
  const [data, setData] = useState<DataItem>(defaultData);
  const { loading, run } = useRequest();
  const form = Form.useForm()[0];
  const user = useSelector((state) => state.user);
  useEffect(() => {
    handleReload();
  }, []);

  const handleReload = () => {
    form.validateFields().then((values) => {
      onSearch({ ...values, ...defaultParams });
    });
  };

  const onSearch = (values) => {
    loadDataSource(values);
  };

  const loadDataSource = async (param?) => {
    let res = await run(getSubAgentWithdrawList({ ...param }));
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
      columns: getColumns(handleReload),
      bordered: true,
      loading,
    },
    searchFields: searchSchema,
    onSearch: onSearch,
  };

  return (
    <div>
      <ProTable form={form} {...tableProps} />
    </div>
  );
};

export default SubWithdrawManage;
