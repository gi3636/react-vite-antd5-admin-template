import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from './tableData';
import useRequest from '@/hooks/useRequest';
import { getUserReport } from '@/api/statementManage';
import { useSelector } from '@/store';
import { Form } from 'antd';

const UserStatement: React.FC = () => {
  const [data, setData] = useState<DataItem>(defaultData);
  const [total, setTotal] = useState<any>({});
  const { loading, run } = useRequest();
  const user: any = useSelector((state) => state.user);
  const form = Form.useForm()[0];

  useEffect(() => {
    form.validateFields().then((values) => {
      onSearch({ ...defaultParams, ...values });
    });
  }, []);

  const onSearch = (values) => {
    if (values.data_time) {
      values.data_time = values.data_time.map((item) => item.format('YYYY-MM-DD'));
    }
    loadDataSource({ ...values, pid: user?.aid });
  };

  const loadDataSource = async (param?) => {
    let res = await run(getUserReport(param));
    setData(res?.data?.result);
    setTotal(res?.data?.total);
  };

  let tableProps: IProTableProps = {
    form,
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
      footer: () => {
        return <div style={{ marginLeft: 22 }}>我的佣金:{total?.agent_comm_amount}</div>;
      },
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

export default UserStatement;
