import { type FC } from 'react';
import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch } from 'antd';
import type { SingleFormField } from './common';
import { FieldControl, type FieldControlProps } from './Control';

export interface SingleFieldProps extends FieldControlProps {
  field: SingleFormField;
}
export const SingleField: FC<SingleFieldProps> = ({ field, ...props }) => {
  const ux = field.ux;
  return (
    <div
      style={{
        width: `${field.width.v}${field.width.u}`,
      }}
      className={`cursor relative flex flex-col px-2 pb-3 pt-2 [&>.mask]:hover:flex`}
    >
      <label className='mb-2 whitespace-nowrap'>{field.name || '新字段'}</label>

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
      <FieldControl {...props} />
    </div>
  );
};
