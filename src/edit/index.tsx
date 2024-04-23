import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState, type FC } from 'react';
import type { DefaultOptionType } from 'antd/es/select';
import type { FormField, SingleFormField } from '@/field';
import { getFieldDefaultUx, getUxTypeOptions } from '@/field';
import AntDesignMinusCircleOutlined from '~icons/ant-design/minus-circle-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const TypeOptions = [
  {
    label: '文本',
    value: 'string',
  },
  { label: '数值', value: 'number' },
  { label: '日期', value: 'date' },
  { label: '布尔', value: 'bool' },
  { label: '简单数组', value: 'array' },
  { label: '嵌套对象', value: 'nest' },
  { label: '对象数组', value: 'nest-array' },
];

export const FieldEdit: FC<{
  field: FormField;
  onCancel: () => void;
  onSave: (data: Partial<FormField>) => void;
}> = ({ field, onCancel, onSave }) => {
  const [form] = Form.useForm<FormField>();
  const [uxTypeOpts, setUxTypeOpts] = useState<DefaultOptionType[]>([]);
  const submit = async () => {
    try {
      const res = await form.validateFields();
      onSave(res);
    } catch (ex) {
      console.error(ex);
      // ignore;
    }
  };

  const fieldType = Form.useWatch('type', form);
  useEffect(() => {
    form.setFieldValue('ux', getFieldDefaultUx(fieldType));
    setUxTypeOpts(getUxTypeOptions(fieldType));
  }, [fieldType]);

  const uxType = Form.useWatch(['ux', 'type'], form) as SingleFormField['ux']['type'];
  const [uxOpts, setUxOpts] = useState(false);
  useEffect(() => {
    if (uxType === 'select' || uxType === 'checkbox' || uxType === 'radio') {
      const newOpts = [{ label: '', value: fieldType === 'string' ? '' : 0 }];
      setUxOpts(true);
      form.setFieldValue(['ux', 'options'], newOpts);
    } else {
      setUxOpts(false);
    }
  }, [uxType, fieldType]);
  return (
    <div className='pt-4'>
      <Form initialValues={{ name: field.name, type: field.type }} {...layout} form={form}>
        <Form.Item
          name='name'
          required
          label='字段'
          rules={[
            {
              validator: (_, v, cb) => {
                if (!v?.length || !v.trim()) cb('不能为空');
                else if (/^\s*\d/.test(v)) {
                  cb('不能以数字打头');
                } else if (/[^_0-9a-z\u4e00-\u9fa5]/.test(v)) {
                  cb('只能包含中文、英文字母、数字或下滑线');
                } else if (v.length < 2) {
                  cb('至少两个字符');
                } else {
                  cb();
                }
              },
            },
          ]}
        >
          <Input placeholder='请输入字段名' />
        </Form.Item>
        <Form.Item required name='type' label='类型'>
          <Select options={TypeOptions} />
        </Form.Item>
        {!!uxTypeOpts.length && (
          <Form.Item required name={['ux', 'type']} label='交互'>
            <Select options={uxTypeOpts} />
          </Form.Item>
        )}
        {uxOpts && (
          <div className='flex'>
            <div className='w-1/6 pt-1 text-right'>选项：</div>
            <div className='flex-1'>
              <Form.List name={['ux', 'options']}>
                {(fields, { remove, add }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className='mb-4 flex items-center gap-2'>
                        <Form.Item
                          noStyle
                          {...restField}
                          name={[name, 'label']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder='文本' />
                        </Form.Item>
                        <Form.Item noStyle {...restField} name={[name, 'value']} required>
                          {fieldType === 'string' && <Input />}
                          {fieldType === 'number' && <InputNumber />}
                        </Form.Item>
                        <Button
                          className='flex-shrink-0'
                          onClick={() => {
                            add({ label: '', value: fieldType === 'string' ? '' : 0 });
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
        )}
      </Form>
      <div className='flex items-center justify-end gap-2'>
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
