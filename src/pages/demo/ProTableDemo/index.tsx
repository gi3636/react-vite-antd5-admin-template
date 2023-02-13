import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from '@/pages/demo/ProTableDemo/tableData';
import { Button } from 'antd';
import { testApi } from '@/api/question';

const ProTableDemo: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<DataItem>(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDataSource(defaultParams);
  }, []);

  const loadDataSource = async (param?) => {
    setLoading(true);
    let { data }: any = await testApi(param);
    setData(data);
    setLoading(false);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (values) => {
    console.log('values', values);
    loadDataSource(values);
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
      rowSelection,
      columns,
      bordered: true,
      loading,
      footer: () => {
        return <div>底部</div>;
      },
    },
    renderAtTop: () => {
      return <Button>顶部按钮</Button>;
    },
    searchFields: searchSchema,
    onSearch: onSearch,
  };

  const handleTest = async () => {
    let data = await testApi({});
    console.log('data', data);
  };

  return (
    <div>
      <Button onClick={handleTest}>测试</Button>
      <ProTable {...tableProps} />
    </div>
  );
};

export default ProTableDemo;
