import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { type FC } from 'react';
import type { NestArrayFormField } from '@/common';

export const NestArrayFieldEdit: FC<{
  form: FormInstance<NestArrayFormField>;
}> = () => {
  return (
    <>
      {/* 当前版本 nest array field 没有表单编辑交互。但为了让 form.setFieldValue("items") 生效，需要注册 Form.Item */}
      <Form.Item name='items' hidden />
    </>
  );
};
