import type { FormInstance } from 'antd';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { useEffect, type FC } from 'react';
import type { DefaultOptionType } from 'antd/es/select';
import { newSingleFormField } from '../field';
import { SingleFieldEdit } from './SingleField';
import { FieldTypeOptions, FormLayout, getFieldDefaultUx } from './helper';
import { ArrayFieldEdit } from './ArrayField';
import { NestFieldEdit } from './NestField';
import { NestArrayFieldEdit } from './NestArrayField';
import {
  type NestFormField,
  type FormField,
  type SingleFormField,
  type ArrayFormField,
  type NestArrayFormField,
} from '@/common';

const WidthOptions: DefaultOptionType[] = [
  { label: '自动', value: '-' },
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
  useEffect(() => {
    form.setFieldsValue(field);
  }, [field]);

  const resetField = (type: FormField['type']) => {
    form.setFieldValue('width', { u: '-' });
    switch (type) {
      case 'placeholder':
        break;
      case 'array':
        form.setFieldValue('itemType', 'string');
        form.setFieldValue('ux', getFieldDefaultUx('array'));
        break;
      case 'nest-array':
      case 'nest':
        form.setFieldValue('items', [newSingleFormField()]);
        break;
      default:
        form.setFieldValue('ux', getFieldDefaultUx(type));
        break;
    }
  };

  const wu = Form.useWatch(['width', 'u'], form);
  const fieldType = Form.useWatch('type', form) as FormField['type'];

  return (
    <div className='pt-4'>
      <Form {...FormLayout} form={form}>
        <Form.Item label='宽度' required>
          <Space.Compact className='relative w-full'>
            {wu !== '-' && (
              <Form.Item
                required
                rules={[{ required: true, message: '不能为空' }]}
                noStyle
                name={['width', 'v']}
              >
                <InputNumber
                  min={wu === 'px' ? 80 : 10}
                  max={wu === 'px' ? 2000 : 100}
                  step={1}
                  className={'flex-1'}
                />
              </Form.Item>
            )}
            {wu === '-' && (
              <div className='flex h-8 flex-1 items-center rounded-bl-md rounded-tl-md border border-solid border-gray-300  px-2 text-xs text-gray-400'>
                继承表单全局配置
              </div>
            )}
            <Form.Item noStyle name={['width', 'u']}>
              <Select
                onChange={(v) => {
                  form.setFieldValue(['width', 'v'], v === '-' ? null : v === 'px' ? 120 : 20);
                }}
                style={{ width: '30%' }}
                options={WidthOptions}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item required name='type' label='类型'>
          <Select
            options={FieldTypeOptions}
            onChange={(type) => {
              resetField(type);
            }}
          />
        </Form.Item>
        {fieldType !== 'placeholder' && (
          <>
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
            <Form.Item name='tip' label='提示'>
              <Input placeholder='提示信息用于字段的 Tooltip 提示' />
            </Form.Item>
          </>
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
