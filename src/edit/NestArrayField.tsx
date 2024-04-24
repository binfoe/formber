import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useContext, useEffect, type FC } from 'react';
import type { NestArrayFormField } from '@/field';
import { getFieldDefaultWidth, newSingleFormField } from '@/field';
import { globalFormConfigContext } from '@/setting';

export const NestArrayFieldEdit: FC<{
  form: FormInstance<NestArrayFormField>;
}> = ({ form }) => {
  const ctx = useContext(globalFormConfigContext);
  useEffect(() => {
    form.setFieldValue('items', [newSingleFormField(ctx)]);
    form.setFieldValue('width', getFieldDefaultWidth(ctx, 'nest-array'));
  }, [form]);

  return (
    <>
      {/* 当前版本 nest array field 没有表单编辑交互。但为了让 form.setFieldValue("items") 生效，需要注册 Form.Item */}
      <Form.Item name='items' hidden />
    </>
  );
};
