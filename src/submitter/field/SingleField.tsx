import { useMemo, type FC } from 'react';
import { Checkbox, Input, InputNumber, Radio, Select, Switch } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import type { SingleFormField } from '@/common';
import { FieldLabel } from '@/builder/field';
import { DatePicker } from '@/date-picker';

export interface SingleFieldProps {
  field: SingleFormField;
  parentPath: string[];
}
export const SingleField: FC<SingleFieldProps> = ({ field, parentPath }) => {
  const { control } = useFormContext();
  const namePath = useMemo(() => [...parentPath, field.name].join('.'), [parentPath]);
  const ux = field.ux;
  console.log(ux);

  return (
    <>
      <FieldLabel className='mb-2 pl-2' field={field} />
      <div className='w-full px-2'>
        <Controller
          name={namePath}
          control={control}
          render={({ field: hookField }) => (
            <>
              {ux.type === 'input' && <Input className='w-full' {...hookField} />}
              {ux.type === 'number-input' && <InputNumber className='w-full' {...hookField} />}
              {ux.type === 'select' && (
                <Select className='w-full' {...hookField} options={ux.options} />
              )}
              {ux.type === 'radio' && (
                <Radio.Group className='w-full' options={ux.options} {...hookField} />
              )}
              {ux.type === 'switch' && <Switch {...hookField} />}
              {ux.type === 'picker' && <DatePicker className='w-full' {...hookField} />}
            </>
          )}
        />
      </div>
    </>
  );
};
