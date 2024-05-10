import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { type FC } from 'react';
import { type NestFormField } from '@/common';

export const NestFieldEdit: FC<{
  form: FormInstance<NestFormField>;
}> = () => {
  return (
    <>
      {/* 当前版本 nest field 没有表单编辑交互。但为了让 form.setFieldValue("items") 生效，需要注册 Form.Item */}
      <Form.Item name='items' hidden noStyle />
    </>
  );
};
