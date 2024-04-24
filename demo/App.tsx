import { useState, type FC } from 'react';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './main.css';
import {
  FormBuilder,
  newArrayFormField,
  newForm,
  newNestFormField,
  newSingleFormField,
} from '@/index';

export const DemoApp: FC = () => {
  const [form, setForm] = useState(() => {
    const f = newForm();
    f.fields = [
      newSingleFormField(),
      newSingleFormField(),
      newSingleFormField(),
      newSingleFormField(),
      newArrayFormField(),
      newNestFormField(),
    ];
    return f;
  });
  return (
    <ConfigProvider locale={zhCN}>
      <div className='p-4'>
        <h1>Form Builder</h1>
        <FormBuilder
          form={form}
          onChange={(data) => {
            setForm((v) => ({
              ...v,
              ...data,
            }));
          }}
        />
      </div>
    </ConfigProvider>
  );
};
