import type { FC } from 'react';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { FormBuilder } from '../src/index';
import './main.css';

export const DemoApp: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <h1>Form Builder</h1>
        <FormBuilder />
      </div>
    </ConfigProvider>
  );
};
