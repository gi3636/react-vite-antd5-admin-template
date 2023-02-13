import React, { useState } from 'react';
import { Form, Table, TableProps } from 'antd';
import SearchForm, { IField } from '@/components/SearchForm/SearchForm';
import { ResizeCallbackData } from 'react-resizable';
import { ColumnsType, ColumnType } from 'antd/es/table';
import ResizableTitle from '@/components/ProTable/component/ResizableTitle/ResizableTitle';

export const defaultData = {
  list: [],
  page: {
    currentPage: 1,
    totalPage: 10,
    total: 0,
  },
};
export const defaultParams = {
  page: 1,
  page_size: 10,
};
export interface DataItem {
  list: any[]; // 数据
  page?: {
    currentPage: number; // 当前页
    total: number; // 总条数
    totalPage: number; // 总页数
  };
}

export interface IProTableProps {
  data?: DataItem; // 要经过装换的数据
  tableProps?: TableProps<any>; // column 没有添加width属性,调整列宽会失效
  searchFields?: IField[]; // 搜索表单字段
  onSearch: (values: any) => void;

  renderAtTop?: () => React.ReactNode; // 在表格上方渲染的内容
}

const ProTable: React.FC<IProTableProps> = ({ data, tableProps, searchFields, onSearch, renderAtTop }) => {
  let loading = !!tableProps?.loading;
  const [columns, setColumns] = React.useState<any>(tableProps?.columns || []);
  const [currentPage, setCurrentPage] = useState(data?.page?.currentPage || 1); // 当前页
  const [pageSize, setPageSize] = useState(10); // 每页条数
  const [form] = Form.useForm();
  /**
   * 处理分页
   * @param page
   * @param pageSize
   */
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    handleSearch({ page, page_size: pageSize });
  };

  /**
   * 处理搜索
   * @param param
   */
  const handleSearch = (param?) => {
    form.validateFields().then((values) => {
      onSearch({ ...values, page: currentPage, page_size: pageSize, ...param });
    });
  };

  /**
   * 重置搜索处理
   */
  const handleReset = () => {
    form.resetFields();
    handleSearch();
  };

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

  /**
   * 转换数据 其实也就添加key值，因为不添加会有Key值报错
   * @param list
   */
  const convertData = (list) => {
    if (!list) return [];
    return list.map((item, index) => {
      return {
        key: index,
        ...item,
      };
    });
  };

  return (
    <>
      <div
        style={{
          // border: '1px solid #f0f0f0',
          borderRadius: 10,
          marginBottom: 10,
        }}>
        {searchFields ? (
          <SearchForm
            form={form}
            searchFields={searchFields}
            onFinish={handleSearch}
            loading={loading}
            handleReset={handleReset}
          />
        ) : null}
      </div>
      {renderAtTop ? renderAtTop() : null}
      <Table
        {...tableProps}
        dataSource={convertData(data?.list) || []}
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.page?.total,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total, range) => (
            <span style={{ padding: '0 5px' }}>
              共<span style={{ padding: '0 5px', fontSize: 15 }}>{total}</span>条数据
            </span>
          ),
        }}
        scroll={{
          x: 'max-content',
        }}
      />
    </>
  );
};

export default ProTable;
