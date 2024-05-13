/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ConfigProvider } from 'antd';

import type { FormSchema, FormSettings } from '../form';
import { FormSettingsContext, globalStyleConfig, newFormDefaultSettings } from '../form';
import { cs } from '../util';
import { FieldList } from './field';
import { ValidateContext } from './validate';
import type { FormField } from '@/common';

export interface FormBuilder {
  exportSchema: () => FormSchema | undefined;
}
export const FormBuilder = forwardRef<
  FormBuilder,
  {
    className?: string;
    settings?: FormSettings;
    initFields?: FormField[];
  }
>(({ className, initFields, settings: propSettings }, ref) => {
  const [fields, setFields] = useState(initFields ?? []);
  const [settings, setSettings] = useState(() => propSettings ?? newFormDefaultSettings());
  useEffect(() => {
    if (propSettings && propSettings !== settings) {
      setSettings(propSettings);
    }
  }, [propSettings]);

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
          settings,
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
    <FormSettingsContext.Provider value={settings}>
      <ValidateContext.Provider value={validateEmitters}>
        <ConfigProvider
          theme={{
            components: globalStyleConfig,
          }}
        >
          <div className={cs('flex flex-wrap items-start gap-y-4  px-2 py-4', className)}>
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
    </FormSettingsContext.Provider>
  );
});
