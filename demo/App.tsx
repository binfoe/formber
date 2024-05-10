import { useState, type FC } from 'react';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider, Tabs } from 'antd';
import './main.css';
import {
  FormBuilder,
  FormSubmitter,
  newArrayFormField,
  newForm,
  newNestArrayFormField,
  newNestFormField,
  newSingleFormField,
} from '@/index';

export const DemoApp: FC = () => {
  const [form, setForm] = useState(() => {
    const f = newForm();
    f.fields = [
      newSingleFormField({
        name: '姓名',
      }),
      newSingleFormField({
        name: '年龄',
        type: 'number',
      }),
      // newSingleFormField(),
      // newSingleFormField(),
      // newArrayFormField(),
      // newNestArrayFormField(),
      // newNestFormField(),
    ];
    return f;
  });
  return (
    <ConfigProvider locale={zhCN}>
      <div className='p-4'>
        <h1>Former Demo</h1>
        <Tabs
          defaultActiveKey='submitter'
          destroyInactiveTabPane
          items={[
            {
              key: 'builder',
              label: 'Form Builder',
              children: (
                <FormBuilder
                  form={form}
                  onChange={(data) => {
                    setForm((v) => ({
                      ...v,
                      ...data,
                    }));
                  }}
                />
              ),
            },
            {
              key: 'submitter',
              label: 'Form Submitter',
              children: <FormSubmitter form={form} />,
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};
