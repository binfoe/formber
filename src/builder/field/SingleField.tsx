import { useMemo, type FC } from 'react';
import { DatePicker, Input, InputNumber, Radio, Select, Switch } from 'antd';
import type { SingleFormField } from '../../common';
import { FieldLabel } from './Label';

export interface SingleFieldProps {
  field: SingleFormField;
}
export const SingleField: FC<SingleFieldProps> = ({ field }) => {
  const ux = field.ux;
  const opts = useMemo(
    () =>
      ux.options?.map((v) => {
        return {
          label: v,
          value: v,
        };
      }),
    [ux.options],
  );
  return (
    <>
      <FieldLabel className='mb-2 pl-2' field={field} />
      <div className='w-full px-2'>
        {ux.type === 'input' && <Input className='w-full' />}
        {ux.type === 'number-input' && <InputNumber className='w-full' />}
        {ux.type === 'select' && <Select placeholder='选择值' className='w-full' options={opts} />}
        {ux.type === 'radio' && (
          <Radio.Group className='flex h-8 w-full items-center' options={opts} />
        )}
        {ux.type === 'switch' && <Switch />}
        {ux.type === 'picker' && <DatePicker className='w-full' />}
      </div>
    </>
  );
};
