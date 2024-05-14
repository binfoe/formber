/* eslint-disable no-console */
import { useRef, useState, type FC } from 'react';
import zhCN from 'antd/locale/zh_CN';
import { Button, ConfigProvider, Tabs, message } from 'antd';
import './main.css';
import {
  FormBuilder,
  FormSettingsEdit,
  FormSubmitter,
  newFormDefaultSettings,
  newNestFormField,
  newSingleFormField,
} from '@/index';
import type { FormField } from '@/common';

const InitFields: FormField[] = [
  newSingleFormField('姓名'),
  newSingleFormField('年龄'),
  newSingleFormField('性别'),
  newSingleFormField('身份证号'),
  newNestFormField('住宅信息', {
    items: [
      newSingleFormField('地址'),
      newSingleFormField('产权面积', {
        type: 'number',
      }),
    ],
  }),
];
const InitSettings = newFormDefaultSettings();

export const DemoApp: FC = () => {
  const [fields, setFields] = useState(InitFields);
  const [settings, setSettings] = useState(InitSettings);

  const builder = useRef<FormBuilder>(null);
  const submitter = useRef<FormSubmitter>(null);

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
                <>
                  <div className='mb-4 font-bold'>编辑表单配置</div>
                  <FormSettingsEdit
                    className='rounded-md border border-solid border-border'
                    value={settings}
                    onChange={(v) => {
                      setSettings(v);
                    }}
                  />
                  <div className='mb-4 mt-8 font-bold'>编辑表单字段</div>
                  <FormBuilder
                    className='rounded-md border border-solid border-border'
                    ref={builder}
                    settings={settings}
                    initFields={fields}
                  />
                  <div className='mt-4'>
                    <Button
                      onClick={() => {
                        if (!builder.current) return;
                        const schema = builder.current.exportSchema();
                        if (!schema) {
                          void message.error('校验失败');
                        } else {
                          void message.success('保存成功');
                          setSettings(schema.settings);
                          setFields(schema.fields);
                        }
                      }}
                      type='primary'
                    >
                      校验并保存
                    </Button>
                  </div>
                </>
              ),
            },
            {
              key: 'submitter',
              label: 'Form Submitter',
              children: (
                <>
                  <FormSubmitter
                    className='rounded-md border border-solid border-border px-2 py-4'
                    ref={submitter}
                    fields={fields}
                    settings={settings}
                  />
                  <div className='mt-4'>
                    <Button
                      onClick={async () => {
                        if (!submitter.current) return;
                        const data = await submitter.current.getData();
                        console.log(data);
                        void message.success('提交完成: ' + JSON.stringify(data));
                      }}
                      type='primary'
                    >
                      提交
                    </Button>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};
