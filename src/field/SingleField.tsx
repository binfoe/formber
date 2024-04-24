import { type FC } from 'react';
import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch } from 'antd';
import type { SingleFormField } from './common';
import { FieldLabel } from './Label';

export interface SingleFieldProps {
  field: SingleFormField;
}
export const SingleField: FC<SingleFieldProps> = ({ field }) => {
  const ux = field.ux;
  return (
    <>
      <FieldLabel className='mb-2 pl-2' field={field} />
      <div className='px-2'>
        {ux.type === 'input' && <Input />}
        {ux.type === 'number-input' && <InputNumber />}
        {ux.type === 'select' && <Select />}
        {ux.type === 'radio' && (
          <Radio.Group>
            {ux.options?.map((opt) => (
              <Radio key={opt.label as string} value={opt.value}>
                {opt.label ?? opt.value}
              </Radio>
            ))}
          </Radio.Group>
        )}
        {ux.type === 'switch' && <Switch />}
        {ux.type === 'picker' && <DatePicker />}
        {ux.type === 'checkbox' && (
          <Checkbox.Group>
            {ux.options?.map((opt) => (
              <Checkbox key={opt.label as string} value={opt.value}>
                {opt.label ?? opt.value}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      </div>
    </>
  );
};
