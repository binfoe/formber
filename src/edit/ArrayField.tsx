import type { FormInstance } from 'antd';
import { Form, Select } from 'antd';
import { useContext, useEffect, useMemo, type FC } from 'react';
import {
  SingleFieldTypeOptions,
  getFieldDefaultUx,
  getUxTypeOptions,
  isUxNeedOpts,
} from './helper';
import { UxOptions } from './UxOptions';
import { getFieldDefaultWidth, type ArrayFormField } from '@/field';
import { globalFormConfigContext } from '@/setting';

export const ArrayFieldEdit: FC<{
  form: FormInstance<ArrayFormField>;
}> = ({ form }) => {
  const fieldItemType = Form.useWatch('itemType', form) as ArrayFormField['itemType'];
  const uxTypeOpts = useMemo(() => getUxTypeOptions('array'), []);
  const uxType = Form.useWatch(['ux', 'type'], form);
  const needUxOpts = isUxNeedOpts(uxType);
  const ctx = useContext(globalFormConfigContext);
  useEffect(() => {
    form.setFieldValue('width', getFieldDefaultWidth(ctx, 'array'));
    form.setFieldValue('itemType', 'string');
    form.setFieldValue('ux', getFieldDefaultUx('array'));
  }, [form]);

  return (
    <>
      <Form.Item required name='itemType' label='元素'>
        <Select options={SingleFieldTypeOptions} />
      </Form.Item>
      <Form.Item required name={['ux', 'type']} label='交互'>
        <Select options={uxTypeOpts} />
      </Form.Item>
      {needUxOpts && <UxOptions form={form} valueType={fieldItemType} />}
    </>
  );
};
