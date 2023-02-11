import React from 'react';
import { Table, TableProps } from 'antd';
import SearchForm, { IField } from '@/components/search-form/SearchForm';

export interface IProTableProps {
  tableProps?: TableProps<any>;
  searchFields: IField[]; // 搜索表单字段
  onSearch: (values: any) => void;
}

const ProTable: React.FC<IProTableProps> = ({ tableProps, searchFields, onSearch }) => {
  let loading = !!tableProps?.loading;
  return (
    <div>
      <div
        style={{
          // border: '1px solid #f0f0f0',
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <SearchForm searchFields={searchFields} onFinish={onSearch} loading={loading} />
      </div>
      <Table {...tableProps} />
    </div>
  );
};

export default ProTable;
