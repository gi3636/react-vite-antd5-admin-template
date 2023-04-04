import React, { useEffect, useState } from 'react';
import ProTable, { DataItem, defaultData, defaultParams, IProTableProps } from '@/components/ProTable/ProTable';
import { columns, searchSchema } from './tableData';
import useRequest from '@/hooks/useRequest';
import { getSubAgentList } from '@/api/subAgent';
import { Button } from 'antd';
import { emitter } from '@/utils/app-emitter';

import ResetCodeModal from './ResetCodeModal';
import ResetPasswordModal from './ResetPasswordModal';
import AddSubAgentModal from '@/pages/subAgent/module/subAgentList/AddSubAgentModal';
export const modalKey = 'addSubAgent';
export const resetPasswordModalKey = 'resetPasswordModalKey';
export const resetCodeModalKey = 'resetCodeModalKey';

const SubAgentList: React.FC = () => {
  const [data, setData] = useState<DataItem>(defaultData);
  const { loading, run } = useRequest();

  useEffect(() => {
    loadDataSource(defaultParams);
  }, []);

  const loadDataSource = async (param?) => {
    let res = await run(getSubAgentList(param));
    setData(res.data);
  };

  const onSearch = (values) => {
    if (values.created_at) {
      values.created_at = values.created_at.map((item) => item.format('YYYY-MM-DD HH:mm:ss'));
    }
    loadDataSource(values);
  };
  const handleReload = () => {
    loadDataSource(defaultParams);
  };

  const openAddSubAgentModal = () => {
    emitter.fire(`${modalKey}ShowModal`);
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
    renderAtTop: () => {
      return (
        <Button type='primary' style={{ marginBottom: 10 }} onClick={openAddSubAgentModal}>
          添加下级代理
        </Button>
      );
    },
    searchFields: searchSchema,
    onSearch: onSearch,
  };

  return (
    <div>
      <ProTable {...tableProps} />
      <AddSubAgentModal modalKey={modalKey} handleReload={handleReload} />
      <ResetCodeModal modalKey={resetCodeModalKey} handleReload={handleReload} />
      <ResetPasswordModal modalKey={resetPasswordModalKey} handleReload={handleReload} />
    </div>
  );
};

export default SubAgentList;
