import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useEffect, type FC } from 'react';
import type { NestArrayFormField } from '@/field';
import { newSingleFormField } from '@/field';

export const NestArrayFieldEdit: FC<{
  form: FormInstance<NestArrayFormField>;
}> = ({ form }) => {
  useEffect(() => {
    form.setFieldValue('items', [newSingleFormField()]);
    form.setFieldValue('width', null);
  }, [form]);

  return (
    <>
      {/* 当前版本 nest array field 没有表单编辑交互。但为了让 form.setFieldValue("items") 生效，需要注册 Form.Item */}
      <Form.Item name='items' hidden />
    </>
  );
};
