/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConfigProvider } from 'antd';
import type { FormSchema } from '../form';
import { globalFormConfigContext, globalStyleConfig } from '../form';
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
    schema: FormSchema;
  }
>(({ className, schema }, ref) => {
  const hookForm = useForm();
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
    <div className={cs('flex h-full w-full flex-col', className)}>
      <div className='mb-4 text-lg font-bold'>{schema.name}</div>

      <globalFormConfigContext.Provider value={schema.config}>
        <FormProvider {...hookForm}>
          <ConfigProvider
            theme={{
              components: globalStyleConfig,
            }}
          >
            <form className='flex flex-wrap items-start gap-y-4 rounded-md border border-solid border-border px-2 py-4'>
              <FieldList fields={schema.fields} parentPath={rootNamePath} />
            </form>
          </ConfigProvider>
        </FormProvider>
      </globalFormConfigContext.Provider>
    </div>
  );
});
