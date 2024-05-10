import { useState, type FC } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import type { Form } from '../form';
import { globalFormConfigContext, globalStyleConfig } from '../form';
import { cs } from '../util';
import { FormSetting } from '../setting';
import { FieldList } from './field';
import AntDesignSettingOutlined from '~icons/ant-design/setting-outlined';

export const FormBuilder: FC<{
  className?: string;
  form: Form;
  onUpdate: () => void;
}> = ({ className, form, onUpdate }) => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [items, setItems] = useState(form.fields);
  const [settings, setSettings] = useState({ name: form.name, config: form.config });

  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <Modal title='配置表单' open={settingOpen} destroyOnClose footer={false}>
        {setSettingOpen && (
          <FormSetting
            onSave={(data) => {
              setSettings(data);
              setSettingOpen(false);
              Object.assign(form, data);
              onUpdate();
            }}
            onClose={() => {
              setSettingOpen(false);
            }}
            settings={settings}
          />
        )}
      </Modal>
      <div className='mb-4 flex items-center gap-2'>
        <div className='text-lg font-bold'>{settings.name}</div>
        <Button
          onClick={() => {
            setSettingOpen(true);
          }}
          type='link'
          icon={<AntDesignSettingOutlined />}
        />
      </div>
      <globalFormConfigContext.Provider value={settings.config}>
        <ConfigProvider
          theme={{
            components: globalStyleConfig,
          }}
        >
          <div className='border-border flex flex-wrap items-start gap-y-4 rounded-md border border-solid px-2 py-4'>
            <FieldList
              onUpdate={() => {
                onUpdate();
              }}
              onChange={(fields) => {
                setItems(fields);
                form.fields = fields;
                onUpdate();
              }}
              fields={items}
            />
          </div>
        </ConfigProvider>
      </globalFormConfigContext.Provider>
    </div>
  );
};
