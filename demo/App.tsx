import { useMemo, useState, type FC } from 'react';
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
  const form = useMemo(() => {
    const f = newForm();
    // const f2 = newNestFormField({
    //   name: '住宅',
    // });
    // f2.items = [
    //   newSingleFormField({ name: '地址' }),
    //   newSingleFormField({ name: '产权面积', type: 'number' }),
    // ];
    // const f3 = newNestFormField({
    //   name: '住宅',
    // });
    // f3.items = [
    //   newSingleFormField({ name: '地址' }),
    //   newSingleFormField({ name: '产权面积', type: 'number' }),
    //   f2,
    // ];
    f.fields = [
      // newSingleFormField({
      //   name: '姓名',
      // }),
      // newSingleFormField({
      //   name: '年龄',
      //   type: 'number',
      // }),
      // newArrayFormField({
      //   name: 'AAA',
      //   itemType: 'date',
      // }),
      newSingleFormField({
        name: 'TTT',
        type: 'string',
        ux: {
          type: 'radio',
          options: ['AAA', 'BBB'],
        },
      }),
    ];
    return f;
  }, []);
  return (
    <ConfigProvider getPopupContainer={() => document.body} locale={zhCN}>
      <div className='p-4'>
        <h1>Former Demo</h1>
        <Tabs
          // defaultActiveKey='submitter'
          destroyInactiveTabPane
          items={[
            {
              key: 'builder',
              label: 'Form Builder',
              children: (
                <FormBuilder
                  form={form}
                  onUpdate={() => {
                    console.log(form);
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
