import { useMemo, type FC } from 'react';
import { Button, Checkbox, DatePicker, Input, InputNumber, Select, Space } from 'antd';
import type { ArrayFormField } from '../../common';
import { FieldLabel } from './Label';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

export const ArrayField: FC<{ field: ArrayFormField }> = ({ field }) => {
  const itemType = field.itemType;
  const demoValues = useMemo(() => new Array(2).fill(0), [itemType]);
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
      <div className='mb-2 flex w-full items-center pl-2'>
        <FieldLabel className='mr-4' field={field} />
        {ux.type === 'input' && (
          <Button
            type='link'
            onClick={() => {
              //
            }}
            icon={<AntDesignPlusCircleOutlined />}
          />
        )}
      </div>
      <div className='flex w-full'>
        {ux.type === 'input' &&
          demoValues.map((_, i) => (
            <div key={i} style={{ width: '20%' }} className='flex items-center px-2'>
              <Space.Compact className='flex w-full items-center'>
                {itemType === 'string' && <Input className='w-full' placeholder='示例值' />}
                {itemType === 'number' && <InputNumber className='w-full' placeholder='示例值' />}
                {itemType === 'date' && <DatePicker className='w-full' placeholder='示例值' />}
                <Button
                  size='small'
                  className='m-0 h-8 p-0'
                  icon={<AntDesignDeleteOutlined className='text-blue-400' />}
                  type='default'
                />
              </Space.Compact>
            </div>
          ))}
        {ux.type === 'checkbox' && (
          <Checkbox.Group className='flex h-8 items-center px-2' options={opts} />
        )}
        {ux.type === 'select' && (
          <div className='w-full px-2'>
            <Select className='w-full' mode='multiple' placeholder='多项选择' options={opts} />
          </div>
        )}
      </div>
    </>
  );
};
