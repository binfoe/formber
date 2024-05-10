import { useMemo, type FC } from 'react';
import { Button, Input, InputNumber, Space } from 'antd';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { ArrayFormField } from '@/common';
import { FieldLabel } from '@/builder/field';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';
import { DatePicker } from '@/date-picker';

export const ArrayField: FC<{ field: ArrayFormField; parentPath: string[] }> = ({
  field,
  parentPath,
}) => {
  const { control } = useFormContext();
  const itemType = field.itemType;
  const namePath = useMemo(() => [...parentPath, field.name].join('.'), [parentPath]);
  const { fields, remove, append } = useFieldArray({
    control,
    name: namePath,
    keyName: '__id',
  });
  return (
    <>
      <div className='mb-2 flex w-full items-center pl-2'>
        <FieldLabel className='mr-4' field={field} />
        <Button
          type='link'
          onClick={() => {
            const v = itemType === 'number' ? 1 : itemType === 'date' ? new Date() : '文本';
            // console.log(itemType, v);
            append(v);
          }}
          icon={<AntDesignPlusCircleOutlined />}
        />
      </div>
      <div className='flex w-full'>
        {!fields.length && (
          <div className='flex h-8 items-center pl-2 text-xs text-gray-50'>无元素，请添加</div>
        )}
        {fields.map((f, i) => (
          <div key={f.__id} style={{ width: '20%' }} className='flex items-center px-2'>
            <Space.Compact className='flex w-full items-center'>
              <Controller
                name={`${namePath}.${i}`}
                control={control}
                render={({ field }) => (
                  <>
                    {itemType === 'string' && <Input {...field} className='w-full' />}
                    {itemType === 'number' && <InputNumber {...field} className='w-full' />}
                    {itemType === 'date' && <DatePicker {...field} className='w-full' />}
                  </>
                )}
              />
              <Button
                size='small'
                className='m-0 h-8 p-0'
                onClick={() => {
                  remove(i);
                }}
                icon={<AntDesignDeleteOutlined className='text-blue-400' />}
                type='default'
              />
            </Space.Compact>
          </div>
        ))}
      </div>
    </>
  );
};
