import type { FormInstance } from 'antd';
import { Form, Select } from 'antd';
import { useContext, useEffect, useMemo, useRef, type FC } from 'react';
import { isUxNeedOpts, getUxTypeOptions, getFieldDefaultUx } from './helper';
import { UxOptions } from './UxOptions';
import { getFieldDefaultWidth, type SingleFormField } from '@/field';
import { globalFormConfigContext } from '@/setting';

export const SingleFieldEdit: FC<{
  form: FormInstance<SingleFormField>;
}> = ({ form }) => {
  const fieldType = Form.useWatch('type', form) as SingleFormField['type'];
  const uxTypeOpts = useMemo(() => getUxTypeOptions(fieldType), [fieldType]);
  const uxType = Form.useWatch(['ux', 'type'], form);
  const needUxOpts = isUxNeedOpts(uxType);
  const ctx = useContext(globalFormConfigContext);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      form.setFieldValue('width', getFieldDefaultWidth(ctx, fieldType));
    }
    form.setFieldValue('ux', getFieldDefaultUx(fieldType));
  }, [fieldType]);

  return (
    <>
      <Form.Item required name={['ux', 'type']} label='交互'>
        <Select options={uxTypeOpts} />
      </Form.Item>
      {needUxOpts && <UxOptions form={form} valueType={fieldType} />}
    </>
  );
};
