import type { FormInstance } from 'antd';
import { Form, Button, Input, InputNumber } from 'antd';
import { useEffect, type FC } from 'react';
import { isUxNeedOpts } from './helper';
import AntDesignMinusCircleOutlined from '~icons/ant-design/minus-circle-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

export const UxOptions: FC<{
  form: FormInstance;
  valueType: string;
}> = ({ valueType, form }) => {
  const uxType = Form.useWatch(['ux', 'type'], form);
  useEffect(() => {
    form.setFieldValue(
      ['ux', 'options'],
      isUxNeedOpts(uxType)
        ? [
            {
              label: '',
              value: null,
            },
          ]
        : undefined,
    );
  }, [uxType, form]);
  return (
    <div className='flex'>
      <div className='w-1/6 pt-1 text-right'>选项：</div>
      <div className='mb-2 flex-1'>
        <Form.List name={['ux', 'options']}>
          {(fields, { remove, add }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className='mb-2 flex gap-2'>
                  <Form.Item
                    className='mb-0'
                    {...restField}
                    name={[name, 'label']}
                    rules={[{ required: true, message: '不能为空' }]}
                  >
                    <Input placeholder='文本' />
                  </Form.Item>
                  <Form.Item
                    className='mb-0'
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: '不能为空' }]}
                  >
                    {valueType === 'number' ? <InputNumber /> : <Input />}
                  </Form.Item>
                  <Button
                    className='flex-shrink-0'
                    onClick={() => {
                      add({ label: '', value: null });
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
              ))}
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
};
