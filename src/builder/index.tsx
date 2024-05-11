/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Col, ConfigProvider, Row } from 'antd';

import type { FormSchema } from '../form';
import { globalFormConfigContext, globalStyleConfig, newFormDefaultSettings } from '../form';
import { cs } from '../util';
import { FormSetting } from './setting';
import { FieldList } from './field';
import { ValidateContext } from './validate';

export interface FormBuilder {
  exportSchema: () => FormSchema | undefined;
}
export const FormBuilder = forwardRef<
  FormBuilder,
  {
    className?: string;
    initFields?: FormSchema['fields'];
    initSettings?: FormSchema['settings'];
    labelColSpan?: number;
    settingsColSpan?: number;
    fieldsColSpan?: number;
  }
>(
  (
    {
      className,
      labelColSpan = 2,
      fieldsColSpan = 24 - labelColSpan,
      settingsColSpan = 24 - labelColSpan,
      initFields,
      initSettings,
    },
    ref,
  ) => {
    const [fields, setFields] = useState(initFields ?? []);
    const [settings, setSettings] = useState(() => initSettings ?? newFormDefaultSettings());
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
      <div className={cs('flex h-full w-full flex-col', className)}>
        <FormSetting
          settings={settings}
          labelColSpan={labelColSpan}
          settingsColSpan={settingsColSpan}
          onChange={(data) => {
            setSettings(data);
          }}
        />
        <Row className='flex'>
          <Col span={labelColSpan} className='flex justify-end'>
            <label>
              <span className='mr-1 font-[SimSun,sans-serif] text-sm text-red'>*</span>字段配置：
            </label>
          </Col>
          <Col span={fieldsColSpan}>
            <globalFormConfigContext.Provider value={settings}>
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
          </Col>
        </Row>
      </div>
    );
  },
);
