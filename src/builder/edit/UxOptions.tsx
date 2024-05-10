import type { FormInstance } from 'antd';
import { Form, Button, Input, InputNumber } from 'antd';
import { type FC } from 'react';
import type { FormField } from '@/common';
import AntDesignMinusCircleOutlined from '~icons/ant-design/minus-circle-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

export const UxOptions: FC<{
  form: FormInstance<FormField>;
  valueType: string;
}> = ({ valueType }) => {
  return (
    <div className='flex'>
      <div className='w-1/6 pt-1 text-right'>选项：</div>
      <div className='mb-2 flex-1'>
        <Form.List name={['ux', 'options']}>
          {(fields, { remove, add }) => {
            // console.log(fields);
            return fields.map(({ key, name, ...restField }) => (
              <div key={key} className='mb-2 flex gap-2'>
                <Form.Item
                  className='mb-0'
                  {...restField}
                  name={name}
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  {valueType === 'number' ? (
                    <InputNumber placeholder='选项值' />
                  ) : (
                    <Input placeholder='选项值' />
                  )}
                </Form.Item>
                <Button
                  className='flex-shrink-0'
                  onClick={() => {
                    add('');
                  }}
                  icon={<AntDesignPlusCircleOutlined />}
                />
                {fields.length > 1 && (
                  <Button
                    className='flex-shrink-0'
                    onClick={() => {
                      remove(name);
                    }}
                    icon={<AntDesignMinusCircleOutlined />}
                  />
                )}
              </div>
            ));
          }}
        </Form.List>
      </div>
    </div>
  );
};
