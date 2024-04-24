import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useContext, useEffect, type FC } from 'react';
import { newSingleFormField, type NestFormField, getFieldDefaultWidth } from '@/field';
import { globalFormConfigContext } from '@/setting';

export const NestFieldEdit: FC<{
  form: FormInstance<NestFormField>;
}> = ({ form }) => {
  const ctx = useContext(globalFormConfigContext);
  useEffect(() => {
    form.setFieldValue('items', [newSingleFormField(ctx)]);
    form.setFieldValue('width', getFieldDefaultWidth(ctx, 'nest'));
  }, [form]);

  return (
    <>
      {/* 当前版本 nest field 没有表单编辑交互。但为了让 form.setFieldValue("items") 生效，需要注册 Form.Item */}
      <Form.Item name='items' hidden />
    </>
  );
};
