/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConfigProvider } from 'antd';
import type { FormSchema } from '../form';
import { FormSettingsContext, globalStyleConfig } from '../form';
import { cs } from '../util';
import { FieldList } from './field';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormSubmitter<T = any> {
  /**
   * 获取表单数据，如果返回 undefined 说明校验未通过
   * @param validate 是否校验，默认为 true
   */
  getData: (validate?: boolean) => Promise<T | undefined>;
}
export const FormSubmitter = forwardRef<
  FormSubmitter,
  {
    className?: string;
    fields: FormSchema['fields'];
    settings: FormSchema['settings'];
    initData?: Record<string, unknown>;
  }
>(({ className, fields, settings, initData }, ref) => {
  const hookForm = useForm({
    defaultValues: initData ?? {},
  });
  const rootNamePath = useMemo(() => [], []);

  useImperativeHandle(
    ref,
    () => ({
      async getData() {
        const success = await hookForm.trigger();
        if (!success) return undefined;
        return hookForm.getValues();
      },
    }),
    [hookForm],
  );
  return (
    <FormSettingsContext.Provider value={settings}>
      <FormProvider {...hookForm}>
        <ConfigProvider
          theme={{
            components: globalStyleConfig,
          }}
        >
          <form className={cs('flex flex-wrap items-start gap-y-4', className)}>
            <FieldList fields={fields} parentPath={rootNamePath} />
          </form>
        </ConfigProvider>
      </FormProvider>
    </FormSettingsContext.Provider>
  );
});
