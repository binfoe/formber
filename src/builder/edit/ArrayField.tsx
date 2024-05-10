import type { FormInstance } from 'antd';
import { Form, Select } from 'antd';
import { type FC } from 'react';
import { ArrayFieldTypeOptions, ArrayUxTypeOptions } from './helper';
import { UxOptions } from './UxOptions';
import type { FormField, ArrayFormField } from '@/common';

export const ArrayFieldEdit: FC<{
  form: FormInstance<ArrayFormField>;
}> = ({ form }) => {
  const fieldItemType = Form.useWatch('itemType', form);
  const uxType = Form.useWatch(['ux', 'type'], form);
  const needUxOpts = uxType === 'select' || uxType === 'checkbox';

  return (
    <>
      <Form.Item required name='itemType' label='元素'>
        <Select options={ArrayFieldTypeOptions} />
      </Form.Item>
      <Form.Item required name={['ux', 'type']} label='交互'>
        <Select
          options={ArrayUxTypeOptions}
          onChange={(v) => {
            if (v === 'select' || v === 'checkbox' || v === 'radio') {
              form.setFieldValue(['ux', 'options'], ['']);
            }
          }}
        />
      </Form.Item>
      {needUxOpts && <UxOptions form={form as FormInstance<FormField>} valueType={fieldItemType} />}
    </>
  );
};
