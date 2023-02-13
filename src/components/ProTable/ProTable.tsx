import React from 'react';
import { Table, TableProps } from 'antd';
import SearchForm, { IField } from '@/components/SearchForm/SearchForm';
import { ResizeCallbackData } from 'react-resizable';
import { ColumnsType, ColumnType } from 'antd/es/table';
import ResizableTitle from '@/components/ProTable/component/resizable-title/ResizableTitle';

export interface IProTableProps {
  tableProps?: TableProps<any>; // column 没有添加width属性,调整列宽会失效
  searchFields?: IField[]; // 搜索表单字段
  onSearch: (values: any) => void;
}

const ProTable: React.FC<IProTableProps> = ({ tableProps, searchFields, onSearch }) => {
  let loading = !!tableProps?.loading;
  const [columns, setColumns] = React.useState<any>(tableProps?.columns || []);

  /**
   * 设置列宽 用来调整列宽 **非必要情况别动**
   * @param index
   */
  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };

  /**
   *  设置侦听函数 用来调整列宽 **非必要情况别动**
   */
  const mergeColumns: ColumnsType<any> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: (column as ColumnType<any>).width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      <div
        style={{
          // border: '1px solid #f0f0f0',
          borderRadius: 10,
          marginBottom: 10,
        }}>
        {searchFields ? <SearchForm searchFields={searchFields} onFinish={onSearch} loading={loading} /> : null}
      </div>
      <Table
        {...tableProps}
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        scroll={{
          x: 'max-content',
        }}
      />
    </>
  );
};

export default ProTable;
