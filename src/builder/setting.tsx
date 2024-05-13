import { useEffect, type FC } from 'react';
import { InputNumber, Select, Space } from 'antd';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { newFormDefaultSettings, type FormSettings } from '../form';
import type { FormFieldWidth, SelectOption } from '../common';
import { cs } from '@/util';

const UnitOptions: SelectOption[] = [
  { label: '%', value: '%' },
  {
    label: 'px',
    value: 'px',
  },
];
export const NameMap: Record<keyof FormSettings, string> = {
  singleFieldWidth: '普通字段',
  arrayFieldWidth: '普通数组',
  nestArrayFieldWidth: '对象数组',
  nestFieldWidth: '嵌套对象',
};
const getBound = (u: FormFieldWidth['u']) => {
  if (u === 'px') return { min: 80, max: 2000 };
  else return { min: 10, max: 100 };
};
const WidthCfg: FC<{ name: keyof FormSettings; onChange: () => void }> = ({ name, onChange }) => {
  const { control } = useFormContext<FormSettings>();

  return (
    <div className='flex w-full items-center gap-1'>
      <label>{NameMap[name]}：</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const bound = getBound(field.value.u);
          return (
            <Space.Compact className='flex-1'>
              <InputNumber
                {...bound}
                value={field.value.v}
                onChange={(v) => {
                  field.onChange({
                    u: field.value.u,
                    v,
                  });
                  onChange();
                }}
                className='flex-1'
              />
              <Select
                value={field.value.u}
                options={UnitOptions}
                style={{ width: '30%' }}
                onChange={(u) => {
                  let v = field.value.v;

                  const bound = getBound(u);
                  if (v < bound.min) {
                    v = bound.min;
                  } else if (v > bound.max) {
                    v = bound.max;
                  }
                  field.onChange({ u, v });
                  onChange();
                }}
              />
            </Space.Compact>
          );
        }}
      />
    </div>
  );
};

const SettingKeys = Object.keys(newFormDefaultSettings()) as (keyof FormSettings)[];

export const FormSettingsEdit: FC<{
  value: FormSettings;
  onChange: (data: FormSettings) => void;
  className?: string;
}> = ({ value, onChange, className }) => {
  const form = useForm<FormSettings>({
    defaultValues: value,
  });
  useEffect(() => {
    form.reset(value);
  }, [value]);

  return (
    <FormProvider {...form}>
      <div className={cs('flex flex-col gap-4 px-4 py-4', className)}>
        {SettingKeys.map((k) => (
          <WidthCfg
            key={k}
            name={k}
            onChange={() => {
              const data = form.getValues();
              onChange(data);
            }}
          />
        ))}
      </div>
    </FormProvider>
  );
};
