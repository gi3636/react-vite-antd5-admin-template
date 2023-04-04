import React, { useEffect, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import BindWithdrawalModal from '@/components/Layout/modals/BindWithdrawalModal';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { useSelector } from '@/store';
import { delWithdrawMethod } from '@/api/auth';

const modalKey = 'bindWithdrawal';
function WithdrawalMethod() {
  const [bankList, setBankList] = useState([]);
  const [usdtList, setUsdtList] = useState([]);
  const user: any = useSelector((state) => state.user);
  const withdrawalMethodList = user?.withdrawalMethodList || [];

  useEffect(() => {
    let bankList = [] as any;
    let usdtList = [] as any;
    withdrawalMethodList.map((item: any) => {
      if (item.type == 1) {
        usdtList.push(item);
      } else {
        bankList.push(item);
      }
    });
    setUsdtList(usdtList);
    setBankList(bankList);
  }, [user]);

  const handleSubmit = () => {
    emitter.fire(`${modalKey}ShowModal`);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '是否确认删除',
      content: '删除后将无法恢复',
      onOk: () => {
        delWithdrawMethod({ id }).then((res) => {
          if (res.code == 200) {
            emitter.fire(EmitterType.updateWithdrawMethodList);
            message.success(res.msg);
          }
        });
      },
    });
  };

  let list = [
    { type: '银行卡', list: bankList },
    { type: 'USDT', list: usdtList },
  ];

  const renderList = (list: any) => {
    if (withdrawalMethodList.length == 0) {
      return null;
    }
    return list.map((item) => {
      return (
        <div className={styles.methodList} key={item.type}>
          <div className={styles.header}>
            <div className={styles.title}>{item.type}</div>
            <div className={styles.count}> {item?.list?.length || 0} / 5</div>
          </div>

          {item.list.map((item: any, index: number) => {
            return (
              <div className={styles.body} key={item.id}>
                <div className={styles.item}>
                  <div className={styles.content}>
                    <div>{item?.bank_name}</div>
                    <div className={styles.address} title={item?.address}>
                      {item?.address}
                    </div>
                  </div>
                  <Button type={'link'} danger className={styles.delBtn} onClick={handleDelete.bind(null, item.id)}>
                    删除
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      {renderList(list)}
      <Button className={styles.addBtn} onClick={handleSubmit} icon={<PlusCircleOutlined />}>
        添加提款方式
      </Button>
      <BindWithdrawalModal modalKey={modalKey} />
    </div>
  );
}

export default WithdrawalMethod;
