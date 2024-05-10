import { useMemo, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, ConfigProvider } from 'antd';
import type { Form } from '../form';
import { globalFormConfigContext, globalStyleConfig } from '../form';
import { cs } from '../util';
import { FieldList } from './field';

export const FormSubmitter: FC<{
  className?: string;
  form: Form;
}> = ({ className, form }) => {
  const hookForm = useForm();
  const rootNamePath = useMemo(() => [], []);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <div className='mb-4 text-lg font-bold'>{form.name}</div>

      <globalFormConfigContext.Provider value={form.config}>
        <FormProvider {...hookForm}>
          <ConfigProvider
            theme={{
              components: globalStyleConfig,
            }}
          >
            <form className='border-border flex flex-wrap items-start gap-y-4 rounded-md border border-solid px-2 py-4'>
              <FieldList fields={form.fields} parentPath={rootNamePath} />
            </form>
          </ConfigProvider>
        </FormProvider>
      </globalFormConfigContext.Provider>

      <div className='mt-4 flex items-center justify-end'>
        <Button
          type='primary'
          onClick={() => {
            void hookForm.handleSubmit(onSubmit)();
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};
