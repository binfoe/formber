import { useState, type FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { Form } from '../form';
import { globalFormConfigContext } from '../form';
import { cs } from '../util';
import { FieldList } from './field';

export const FormSubmitter: FC<{
  className?: string;
  form: Form;
}> = ({ className, form }) => {
  const hookForm = useForm();
  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <div className='text-lg font-bold'>{form.name}</div>

      <globalFormConfigContext.Provider value={form.config}>
        <FormProvider {...hookForm}>
          <form className='flex flex-wrap items-start gap-y-4 rounded-md border border-solid border-gray-300 px-2 py-4'>
            <FieldList fields={form.fields} />
          </form>
        </FormProvider>
      </globalFormConfigContext.Provider>
    </div>
  );
};
