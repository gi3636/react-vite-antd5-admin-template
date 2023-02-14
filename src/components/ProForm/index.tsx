import React, { useMemo } from 'react';
import { Form, theme } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { FormInstance } from 'antd/es/form/hooks/useForm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

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
}
function ProForm({ form, fields, onFinish, loading, handleReset }: IProps) {
  const { token } = theme.useToken();
  const formStyle = {
    padding: '10px 0',
    maxWidth: 'none',
    borderRadius: token.borderRadiusLG,
  };

  /**
   * 获取表单字段
   */
  const getFields = useMemo(() => {
    return fields.map((item) => {
      item.component = React.cloneElement(item.component, {
        placeholder: `请输入${item.label}`,
      });
      return (
        <Form.Item {...item} key={item.name}>
          {item.component}
        </Form.Item>
      );
    });
  }, [fields]);

  return (
    <Form form={form} name='form' style={formStyle} onFinish={onFinish} {...formItemLayout} scrollToFirstError>
      {getFields}
    </Form>
  );
}

export default ProForm;
