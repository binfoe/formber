import { useMemo, type FC } from 'react';
import { Form as AForm, Button, Input, InputNumber, Select, Space } from 'antd';
import type { FormInstance } from 'antd/lib';
import type { DefaultOptionType } from 'antd/es/select';
import type { Form, FormConfig } from './form';
import type { FormFieldWidth } from './field';

const UnitOptions: DefaultOptionType[] = [
  { label: '%', value: '%' },
  {
    label: 'px',
    value: 'px',
  },
];
const NameMap: Record<keyof FormConfig, string> = {
  singleFieldWidth: '普通字段',
  arrayFieldWidth: '普通数组',
  nestArrayFieldWidth: '对象数组',
  nestFieldWidth: '对象字段',
};
const WidthCfg: FC<{ name: keyof FormConfig; form: FormInstance<Form> }> = ({ name, form }) => {
  const u = AForm.useWatch(['config', name, 'u'], form) as FormFieldWidth['u'];
  const isPx = u === 'px';
  return (
    <div className='flex w-full'>
      <label className='pt-1'>{NameMap[name]}：</label>
      <Space.Compact className='flex-1'>
        <AForm.Item noStyle name={['config', name, 'v']}>
          <InputNumber min={isPx ? 80 : 10} max={isPx ? 2000 : 100} className='flex-1' />
        </AForm.Item>
        <AForm.Item noStyle name={['config', name, 'u']}>
          <Select options={UnitOptions} style={{ width: '30%' }} />
        </AForm.Item>
      </Space.Compact>
    </div>
  );
};
export const FormSetting: FC<{
  form: Form;
  onSave: (data: Partial<Form>) => void;
  onClose: () => void;
}> = ({ form, onClose, onSave }) => {
  const [aform] = AForm.useForm<Form>();
  const submit = async () => {
    try {
      const res = await aform.validateFields();
      onSave(res);
    } catch (ex) {
      console.error(ex);
    }
  };
  const ks = useMemo(() => Object.keys(form.config) as (keyof FormConfig)[], [form.config]);
  return (
    <div className='pt-4'>
      <AForm initialValues={form} form={aform}>
        <AForm.Item required rules={[{ required: true }]} name='name' label='表单名称'>
          <Input />
        </AForm.Item>
        <AForm.Item required label='默认宽度'>
          <div className='flex flex-col gap-4 rounded-md border border-solid border-gray-300 p-4'>
            {ks.map((k) => (
              <WidthCfg key={k} name={k} form={aform} />
            ))}
          </div>
        </AForm.Item>
      </AForm>
      <div className='flex items-center justify-end gap-2'>
        <Button onClick={() => onClose()}>取消</Button>
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
