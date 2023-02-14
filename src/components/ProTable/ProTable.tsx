import React, { useCallback, useMemo, useState } from 'react';
import { FloatButton, Form, Table, TableProps } from 'antd';
import SearchForm, { IField } from '@/components/SearchForm/SearchForm';
import { ResizeCallbackData } from 'react-resizable';
import { ColumnsType, ColumnType } from 'antd/es/table';
import ResizableTitle from '@/components/ProTable/component/ResizableTitle/ResizableTitle';
import styles from './index.module.scss';

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

/**
 * 必要数据格式
 */
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
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const renderAtTopContainerRef = React.useRef<HTMLDivElement>(null);

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
  const handleSearch = useCallback((param) => {
    // 重置页码
    if (param.page === undefined) {
      setPageSize(defaultParams.page_size);
    }
    form.validateFields().then((values) => {
      onSearch({ ...values, page: currentPage, page_size: pageSize, ...param });
    });
  }, []);

  /**
   * 重置搜索处理
   */
  const handleReset = useCallback(() => {
    form.resetFields();
    setCurrentPage(defaultParams.page);
    setPageSize(defaultParams.page_size);
    handleSearch({ page: defaultParams.page, page_size: defaultParams.page_size });
  }, []);

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
   *  合并列参数
   */
  const mergeColumns: ColumnsType<any> = columns.map((col, index) => {
    if (!col?.width) {
      col.width = 100;
    }
    return {
      ...col,
      align: 'center',
      onHeaderCell: (column) => ({
        width: (column as ColumnType<any>).width,
        onResize: handleResize(index),
      }),
    };
  });

  /**
   * 转换数据 其实也就添加key值，因为不添加会有Key值报错
   * @param list
   */
  const convertData = (list) => {
    if (!list) return [];
    return list.map((item, index) => {
      return {
        key: index,
        align: 'center',
        ...item,
      };
    });
  };

  /**
   * 渲染搜索表单 用useMemo优化性能
   */
  const renderSearchForm = useMemo(() => {
    if (!searchFields) return null;
    return (
      <div ref={searchContainerRef} className={styles.searchFormContainer}>
        <SearchForm
          form={form}
          fields={searchFields}
          onFinish={handleSearch}
          loading={loading}
          handleReset={handleReset}
        />
      </div>
    );
  }, [form, searchFields, handleSearch, loading]);

  const renderAtTopContainer = () => {
    return (
      <div
        ref={renderAtTopContainerRef}
        className={styles.renderAtTop}
        style={{ top: searchContainerRef?.current?.clientHeight || 0 }}>
        {renderAtTop ? renderAtTop() : null}
      </div>
    );
  };

  return (
    <div>
      <FloatButton.BackTop />
      {renderSearchForm}
      {renderAtTopContainer ? renderAtTopContainer() : null}
      <Table
        {...tableProps}
        dataSource={convertData(data?.list) || []}
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        sticky={{
          //偏移 搜索表单的高度 加上 在table上方渲染的内容高度
          offsetHeader:
            (searchContainerRef?.current?.clientHeight || 0) + (renderAtTopContainerRef?.current?.clientHeight || 0),
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
    </div>
  );
};

export default ProTable;
