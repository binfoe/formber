import { useMemo, type FC } from 'react';
import { Button, Checkbox, Input, InputNumber, Select, Space } from 'antd';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { ArrayFormField } from '@/common';
import { FieldLabel } from '@/builder/field';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';
import { DatePicker } from '@/date-picker';

export const ArrayField: FC<{ field: ArrayFormField; parentPath: (string | number)[] }> = ({
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
  const appendNew = () => {
    const v = itemType === 'number' ? 1 : itemType === 'date' ? new Date() : '文本';
    // console.log(itemType, v);
    append(v);
  };
  const ux = field.ux;
  const isOpt = ux?.type === 'select' || ux?.type === 'checkbox';
  const opts = useMemo(
    () =>
      ux?.options?.map((v) => {
        return {
          label: v,
          value: v,
        };
      }),
    [ux?.options],
  );
  return (
    <>
      <div className='mb-2 flex w-full items-center pl-2'>
        <FieldLabel className='mr-4' field={field} />
        {!isOpt && (
          <Button type='link' onClick={() => appendNew()} icon={<AntDesignPlusCircleOutlined />} />
        )}
      </div>
      <div className='flex w-full'>
        {!isOpt ? (
          <>
            {!fields.length && (
              <div
                onClick={() => appendNew()}
                className='flex h-8 w-full cursor-pointer items-center pl-2 text-xs text-gray-50 hover:text-gray-300'
              >
                无元素，点击添加
              </div>
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
          </>
        ) : (
          <Controller
            control={control}
            name={namePath}
            render={({ field }) => (
              <div className='w-full px-2'>
                {ux.type === 'select' && (
                  <Select
                    {...field}
                    mode='multiple'
                    placeholder='多项选择'
                    options={opts}
                    className='w-full'
                  />
                )}
                {ux.type === 'checkbox' && (
                  <Checkbox.Group {...field} options={opts} className='flex items-center' />
                )}
              </div>
            )}
          />
        )}
      </div>
    </>
  );
};
