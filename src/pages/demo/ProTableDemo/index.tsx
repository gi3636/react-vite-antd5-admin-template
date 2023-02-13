import React, { useEffect, useState } from 'react';
import type { TableRowSelection } from 'antd/es/table/interface';
import ProTable, { IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from '@/pages/demo/ProTableDemo/tableData';

const ProTableDemo: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDataSource();
  }, []);

  const loadDataSource = (param?) => {
    setLoading(true);
    const data = [] as any;
    for (let i = 0; i < 60; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    setDataSource(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (values) => {
    console.log(values);
    loadDataSource(values);
  };

  let tableProps: IProTableProps = {
    tableProps: {
      rowSelection,
      columns,
      dataSource: dataSource,
      bordered: true,
      loading,
    },
    // searchFields: searchSchema,
    onSearch: onSearch,
  };

  return (
    <div>
      <ProTable {...tableProps} />
    </div>
  );
};

export default ProTableDemo;
