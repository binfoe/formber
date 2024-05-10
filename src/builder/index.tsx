import { useState, type FC } from 'react';
import { Button, Modal } from 'antd';
import type { Form } from '../form';
import { globalFormConfigContext } from '../form';
import { cs } from '../util';
import { FormSetting } from '../setting';
import { FieldList } from './field';
import AntDesignSettingOutlined from '~icons/ant-design/setting-outlined';

export const FormBuilder: FC<{
  className?: string;
  form: Form;
  onChange: (data: Partial<Form>) => void;
}> = ({ className, form, onChange }) => {
  const [settingOpen, setSettingOpen] = useState(false);
  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <Modal title='配置表单' open={settingOpen} destroyOnClose footer={false}>
        {setSettingOpen && (
          <FormSetting
            onSave={(data) => {
              onChange(data);
              setSettingOpen(false);
            }}
            onClose={() => {
              setSettingOpen(false);
            }}
            form={form}
          />
        )}
      </Modal>
      <div className='mb-4 flex items-center gap-2'>
        <div className='text-lg font-bold'>{form.name}</div>
        <Button
          onClick={() => {
            setSettingOpen(true);
          }}
          type='link'
          icon={<AntDesignSettingOutlined />}
        />
      </div>
      <globalFormConfigContext.Provider value={form.config}>
        <div className='flex flex-wrap items-start gap-y-4 rounded-md border border-solid border-gray-300 px-2 py-4'>
          <FieldList fields={form.fields} />
        </div>
      </globalFormConfigContext.Provider>
    </div>
  );
};
