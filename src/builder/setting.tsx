import { useState, type FC } from 'react';
import { Form as AForm, InputNumber, Select, Space } from 'antd';
import type { FormInstance } from 'antd/lib';
import { newFormDefaultSettings, type FormSettings } from '../form';
import type { FormFieldWidth, SelectOption } from '../common';

const UnitOptions: SelectOption[] = [
  { label: '%', value: '%' },
  {
    label: 'px',
    value: 'px',
  },
];
const NameMap: Record<keyof FormSettings, string> = {
  singleFieldWidth: '普通字段',
  arrayFieldWidth: '普通数组',
  nestArrayFieldWidth: '对象数组',
  nestFieldWidth: '嵌套对象',
};
const getBound = (u: FormFieldWidth['u']) => {
  if (u === 'px') return { min: 80, max: 2000 };
  else return { min: 10, max: 100 };
};
const WidthCfg: FC<{ name: keyof FormSettings; form: FormInstance<FormSettings> }> = ({
  name,
  form,
}) => {
  const [bound, setBound] = useState(() => getBound(form.getFieldValue([name, 'u'])));

  return (
    <div className='flex w-full'>
      <label className='pt-1'>{NameMap[name]}：</label>
      <Space.Compact className='flex-1'>
        <AForm.Item noStyle name={[name, 'v']}>
          <InputNumber {...bound} className='flex-1' />
        </AForm.Item>
        <AForm.Item noStyle name={[name, 'u']}>
          <Select
            options={UnitOptions}
            style={{ width: '30%' }}
            onChange={(u) => {
              const v = form.getFieldValue([name, 'v']);
              const bound = getBound(u);
              if (v < bound.min) {
                form.setFieldValue([name, 'v'], bound.min);
              } else if (v > bound.max) {
                form.setFieldValue([name, 'v'], bound.max);
              }
              setBound(bound);
            }}
          />
        </AForm.Item>
      </Space.Compact>
    </div>
  );
};

const SettingKeys = Object.keys(newFormDefaultSettings()) as (keyof FormSettings)[];

export const FormSetting: FC<{
  settings: FormSettings;
  onChange: (data: FormSettings) => void;
  labelColSpan: number;
  settingsColSpan: number;
}> = ({ settings, labelColSpan, settingsColSpan, onChange }) => {
  const [aform] = AForm.useForm<FormSettings>();
  AForm.useWatch((values) => {
    onChange(values);
  }, aform);
  return (
    <div className='pt-4'>
      <AForm
        initialValues={settings}
        form={aform}
        wrapperCol={{ span: settingsColSpan }}
        labelCol={{ span: labelColSpan }}
      >
        <AForm.Item required label='默认宽度'>
          <div className='flex flex-col gap-4 rounded-md border border-solid border-border p-4'>
            {SettingKeys.map((k) => (
              <WidthCfg key={k} name={k} form={aform} />
            ))}
          </div>
        </AForm.Item>
      </AForm>
    </div>
  );
};
