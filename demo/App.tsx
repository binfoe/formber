/* eslint-disable no-console */
import { useRef, useState, type FC } from 'react';
import zhCN from 'antd/locale/zh_CN';
import { Button, ConfigProvider, Tabs, message } from 'antd';
import './main.css';
import {
  FormBuilder,
  FormSubmitter,
  newArrayFormField,
  newFormSchema,
  newNestArrayFormField,
  newNestFormField,
  newSingleFormField,
} from '@/index';

export const DemoApp: FC = () => {
  const [formSchema, setFormSchema] = useState(() =>
    newFormSchema('基础信息', {
      fields: [
        newArrayFormField('xxx'),
        newNestArrayFormField('ppp'),
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
      ],
    }),
  );

  const builder = useRef<FormBuilder>(null);
  const submitter = useRef<FormSubmitter>(null);

  return (
    <ConfigProvider getPopupContainer={() => document.body} locale={zhCN}>
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
                <>
                  <FormBuilder
                    onSettingsChange={(data) => {
                      setFormSchema((v) => ({
                        ...data,
                        fields: v.fields,
                      }));
                    }}
                    ref={builder}
                    initSchema={formSchema}
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
                          setFormSchema(schema);
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
                  <FormSubmitter ref={submitter} schema={formSchema} />
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
