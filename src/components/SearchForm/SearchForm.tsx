import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row, theme } from 'antd';
import Collapse from '@/components/SearchForm/component/collapse/CollapseBtn';
import { FormItemProps } from 'antd/es/form/FormItem';
import { FormInstance } from 'antd/es/form/hooks/useForm';

const MAX_SHOW_ROW = 1; // 最多展示几行, 超过则折叠
export interface IField extends FormItemProps {
  col: number; // 一行中占几列, 一行最多24列, 一般为8的倍数
  name: string;
  component: React.ReactElement;
}

interface IProps {
  fields: IField[];
  onFinish?: (values: any) => void;
  handleReset?: () => void;
  loading?: boolean;
  form?: FormInstance;
  expand?: boolean;
  setExpand?: (expand: boolean) => void;
}
function SearchForm({ form, fields, onFinish, loading, handleReset, expand, setExpand }: IProps) {
  const [showCollapse, setShowCollapse] = useState(false);
  const { token } = theme.useToken();
  const formStyle = {
    maxWidth: 'none',
    // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  useEffect(() => {
    handleShowCollapse();
  }, [fields]);

  /**
   * 获取表单字段
   */
  const getFields = useMemo(() => {
    let count = 0;
    return fields.map((item) => {
      //如果超过最大展示行数, 则折叠
      if (count >= MAX_SHOW_ROW * 24 && !expand) {
        return null;
      } else {
        count += item.col;
        item.component = React.cloneElement(item.component, {
          placeholder: `请输入${item.label}`,
        });
        return (
          <Col span={item.col} key={item.name}>
            <Form.Item {...item}>{item.component}</Form.Item>
          </Col>
        );
      }
    });
  }, [fields, expand]);

  /**
   * 判断是否展示折叠按钮
   */
  const handleShowCollapse = () => {
    if (getColTotal() > MAX_SHOW_ROW * 24) {
      setShowCollapse(true);
    }
  };

  /**
   * 获取展开的字段数
   */
  function getColTotal() {
    let count = 0;
    fields.map((item) => {
      count += item.col;
    });
    return count;
  }

  return (
    <Form form={form} name='advanced_search' style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>{getFields}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            查询
          </Button>
          <Button style={{ margin: '0 8px' }} onClick={handleReset || (() => form?.resetFields())}>
            重置
          </Button>
          {showCollapse ? <Collapse expand={expand} setExpand={setExpand} /> : null}
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
