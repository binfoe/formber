import type { FormInstance } from 'antd';
import { Form, Select } from 'antd';
import { type FC } from 'react';
import { BoolUxTypeOptions, DateUxTypeOptions, NumUxTypeOptions, StrUxTypeOptions } from './helper';
import { UxOptions } from './UxOptions';
import type { FormField, SelectOption, SingleFormField } from '@/common';

const Opts: Record<SingleFormField['type'], SelectOption[]> = {
  string: StrUxTypeOptions,
  bool: BoolUxTypeOptions,
  number: NumUxTypeOptions,
  date: DateUxTypeOptions,
};
export const SingleFieldEdit: FC<{
  form: FormInstance<SingleFormField>;
}> = ({ form }) => {
  const fieldType = Form.useWatch('type', form);
  const uxType = Form.useWatch(['ux', 'type'], form);
  const needUxOpts = uxType === 'select' || uxType === 'radio';

  return (
    <>
      <Form.Item required name={['ux', 'type']} label='交互'>
        <Select
          options={Opts[fieldType]}
          onChange={(v) => {
            if (v === 'select' || v === 'checkbox' || v === 'radio') {
              if (fieldType === 'bool') {
                form.setFieldValue(['ux', 'options'], ['是', '否']);
              } else {
                form.setFieldValue(['ux', 'options'], ['']);
              }
            }
          }}
        />
      </Form.Item>
      {needUxOpts && <UxOptions form={form as FormInstance<FormField>} valueType={fieldType} />}
    </>
  );
};
