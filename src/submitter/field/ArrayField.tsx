import { useMemo, type FC } from 'react';
import { Button, Input, InputNumber } from 'antd';
import type { ArrayFormField } from '@/common';
import { FieldLabel } from '@/builder/field';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

export const ArrayField: FC<{ field: ArrayFormField }> = ({ field }) => {
  const itemType = field.itemType;
  const demoValues = useMemo(
    () =>
      new Array(2).fill(0).map((_, i) => {
        return itemType === 'string' ? `文本${i + 1}` : i + 1;
      }),
    [itemType],
  );
  return (
    <>
      <div className='mb-2 flex w-full items-center pl-2'>
        <FieldLabel className='mr-4' field={field} />
        <Button
          type='link'
          onClick={() => {
            //
          }}
          icon={<AntDesignPlusCircleOutlined />}
        />
      </div>
      <div className='flex w-full'>
        {demoValues.map((v) => (
          <div key={v} style={{ width: '20%' }} className='flex items-center px-2'>
            <div className='flex-1'>
              {itemType === 'string' ? (
                <Input
                  className='w-full'
                  value={v}
                  addonAfter={
                    <button className='flex h-full w-full items-center justify-center'>
                      <AntDesignDeleteOutlined
                        onClick={() => {
                          console.error('todo delete');
                        }}
                      />
                    </button>
                  }
                />
              ) : (
                <InputNumber className='w-full' value={v} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
