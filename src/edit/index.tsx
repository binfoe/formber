import type { FormInstance } from 'antd';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { type FC } from 'react';
import type { DefaultOptionType } from 'antd/es/select';
import { SingleFieldEdit } from './SingleField';
import { FieldTypeOptions, FormLayout } from './helper';
import { ArrayFieldEdit } from './ArrayField';
import { NestFieldEdit } from './NestField';
import { NestArrayFieldEdit } from './NestArrayField';
import type {
  NestFormField,
  FormField,
  SingleFormField,
  ArrayFormField,
  NestArrayFormField,
} from '@/field';

const WidthOptions: DefaultOptionType[] = [
  { label: '%', value: '%' },
  {
    label: 'px',
    value: 'px',
  },
];
export const FieldEdit: FC<{
  field: FormField;
  onCancel: () => void;
  onSave: (data: Partial<FormField>) => void;
}> = ({ field, onCancel, onSave }) => {
  const [form] = Form.useForm<FormField>();
  const submit = async () => {
    try {
      const res = await form.validateFields();
      onSave(res);
    } catch (ex) {
      console.error(ex);
      // ignore;
    }
  };

  const fieldType = Form.useWatch('type', form) as FormField['type'];
  const wUnit = Form.useWatch(['width', 'u'], form) as FormField['width']['u'];
  const wPx = wUnit === 'px';
  return (
    <div className='flex flex-wrap pt-4'>
      <div className='w-1/2 pr-4'>
        <div></div>
        <Form initialValues={field} {...FormLayout} form={form}>
          <Form.Item required name='type' label='类型'>
            <Select options={FieldTypeOptions} />
          </Form.Item>
          {fieldType !== 'placeholder' && (
            <Form.Item
              name='name'
              required
              label='字段'
              rules={[
                {
                  validator: (_, v) => {
                    if (!v?.length || !v.trim()) return Promise.reject('不能为空');
                    else if (/^\s*\d/.test(v)) {
                      return Promise.reject('不能以数字打头');
                    } else if (/[^_0-9a-z\u4e00-\u9fa5]/.test(v)) {
                      return Promise.reject('只能包含中文、英文字母、数字或下滑线');
                    } else if (v.length < 2) {
                      return Promise.reject('至少两个字符');
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input placeholder='请输入字段名' />
            </Form.Item>
          )}

          {fieldType === 'placeholder' ? null : fieldType === 'nest-array' ? (
            <NestArrayFieldEdit form={form as FormInstance<NestArrayFormField>} />
          ) : fieldType === 'nest' ? (
            <NestFieldEdit form={form as FormInstance<NestFormField>} />
          ) : fieldType === 'array' ? (
            <ArrayFieldEdit form={form as FormInstance<ArrayFormField>} />
          ) : (
            <SingleFieldEdit form={form as FormInstance<SingleFormField>} />
          )}
        </Form>
      </div>
      <div className='w-1/2 pl-4'>
        <Form initialValues={{ width: field.width }} {...FormLayout} form={form}>
          <Form.Item label='宽度'>
            <Space.Compact className='w-full'>
              <Form.Item required noStyle name={['width', 'v']}>
                <InputNumber
                  min={wPx ? 80 : 10}
                  max={wPx ? 2000 : 100}
                  step={1}
                  className='flex-1'
                />
              </Form.Item>
              <Form.Item noStyle name={['width', 'u']}>
                <Select style={{ width: '30%' }} options={WidthOptions} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Form>
      </div>
      <div className='flex w-full items-center justify-end gap-2'>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            void submit();
          }}
          type='primary'
        >
          确认
        </Button>
      </div>
    </div>
  );
};
