import { type FC } from 'react';
import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, Switch } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import type { SingleFormField } from '@/common';
import { FieldLabel } from '@/builder/field';

export interface SingleFieldProps {
  field: SingleFormField;
}
export const SingleField: FC<SingleFieldProps> = ({ field }) => {
  const { control } = useFormContext();
  const ux = field.ux;
  return (
    <>
      <FieldLabel className='mb-2 pl-2' field={field} />
      <div className='px-2'>
        <Controller
          name={field.name}
          control={control}
          render={({ field: hookField }) => (
            <>
              {ux.type === 'input' && <Input {...hookField} />}
              {ux.type === 'number-input' && <InputNumber {...hookField} />}
              {ux.type === 'select' && <Select {...hookField} options={ux.options} />}
              {ux.type === 'radio' && <Radio.Group options={ux.options} {...hookField} />}
              {ux.type === 'switch' && <Switch {...hookField} />}
              {ux.type === 'picker' && <DatePicker {...hookField} />}
              {ux.type === 'checkbox' && <Checkbox.Group options={ux.options} {...hookField} />}
            </>
          )}
        />
      </div>
    </>
  );
};
