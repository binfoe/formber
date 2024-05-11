/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import type { FormSchema } from '../form';
import { globalFormConfigContext, globalStyleConfig, newFormDefaultConfig } from '../form';
import { cs } from '../util';
import { FormSetting } from './setting';
import { FieldList } from './field';
import { ValidateContext } from './validate';
import AntDesignSettingOutlined from '~icons/ant-design/setting-outlined';

export interface FormBuilder {
  exportSchema: () => FormSchema | undefined;
}
export const FormBuilder = forwardRef<
  FormBuilder,
  {
    className?: string;
    initSchema?: FormSchema;
    onSettingsChange?: (settings: Pick<FormSchema, 'config' | 'name'>) => void;
  }
>(({ className, initSchema, onSettingsChange }, ref) => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [fields, setFields] = useState(initSchema?.fields ?? []);
  const [settings, setSettings] = useState({
    name: initSchema?.name ?? '',
    config: {
      ...newFormDefaultConfig(),
      ...initSchema?.config,
    },
  });
  const validateEmitters = useMemo(() => new Set<() => boolean>(), []);

  useImperativeHandle(
    ref,
    () => ({
      exportSchema() {
        let hasErr = false;
        validateEmitters.forEach((validateFn) => {
          if (!validateFn()) hasErr = true;
        });
        if (hasErr) return undefined;
        return {
          ...settings,
          fields,
        };
      },
    }),
    [settings, fields],
  );

  // useEffect(() => {
  //   console.log(initSchema);
  //   return () => {
  //     console.log('destroy');
  //   };
  // }, []);

  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <Modal title='配置表单' open={settingOpen} destroyOnClose footer={false}>
        {setSettingOpen && (
          <FormSetting
            onSave={(data) => {
              setSettings(data);
              onSettingsChange?.(data);
              setSettingOpen(false);
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
        <ValidateContext.Provider value={validateEmitters}>
          <ConfigProvider
            theme={{
              components: globalStyleConfig,
            }}
          >
            <div className='flex flex-wrap items-start gap-y-4 rounded-md border border-solid border-border px-2 py-4'>
              <FieldList
                // onUpdate={() => {
                //   onUpdate?.({
                //     ...settings,
                //     fields,
                //   });
                // }}
                onChange={(fields) => {
                  setFields(fields);
                  // onUpdate?.({
                  //   ...settings,
                  //   fields,
                  // });
                }}
                fields={fields}
              />
            </div>
          </ConfigProvider>
        </ValidateContext.Provider>
      </globalFormConfigContext.Provider>
    </div>
  );
});
