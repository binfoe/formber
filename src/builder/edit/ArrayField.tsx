import type { FormInstance } from 'antd';
import { Form, Select } from 'antd';
import { useMemo, type FC } from 'react';
import { ArrayFieldTypeOptions, getUxTypeOptions, isUxNeedOpts } from './helper';
import { UxOptions } from './UxOptions';
import { type ArrayFormField } from '@/common';

export const ArrayFieldEdit: FC<{
  form: FormInstance<ArrayFormField>;
}> = ({ form }) => {
  const fieldItemType = Form.useWatch('itemType', form) as ArrayFormField['itemType'];
  const uxTypeOpts = useMemo(() => getUxTypeOptions('array'), []);
  const uxType = Form.useWatch(['ux', 'type'], form);
  const needUxOpts = isUxNeedOpts(uxType);

  return (
    <>
      <Form.Item required name='itemType' label='元素'>
        <Select options={ArrayFieldTypeOptions} />
      </Form.Item>
      <Form.Item required name={['ux', 'type']} label='交互'>
        <Select options={uxTypeOpts} />
      </Form.Item>
      {needUxOpts && <UxOptions form={form} valueType={fieldItemType} />}
    </>
  );
};
