import { useContext, useState, type FC } from 'react';
import { Button } from 'antd';
import { globalFormConfigContext, newGlobalFormConfig, type GlobalFormConfig } from './setting';
import type { FormField } from './field';
import { FieldList, newArrayFormField, newNestFormField, newSingleFormField } from './field';
import { cs } from './util';
import AntDesignSettingOutlined from '~icons/ant-design/setting-outlined';

const FormBuilderInner: FC = () => {
  const ctx = useContext(globalFormConfigContext);
  const [fields] = useState<FormField[]>(() => [
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newArrayFormField(ctx),
    newNestFormField(ctx),
  ]);

  return (
    <>
      <div className='flex flex-wrap items-start gap-y-4 rounded-md border border-solid border-gray-300 px-2 py-4'>
        <FieldList fields={fields} />
      </div>
    </>
  );
};
export const FormBuilder: FC<{
  className?: string;
}> = ({ className }) => {
  const [cfg, setCfg] = useState<GlobalFormConfig>(() => newGlobalFormConfig());
  return (
    <div className={cs('flex h-full w-full flex-col', className)}>
      <div className='mb-4 flex items-center gap-2'>
        <div className='text-lg font-bold'>新表单</div>
        <Button
          onClick={() => {
            //
          }}
          type='link'
          icon={<AntDesignSettingOutlined />}
        />
      </div>
      <globalFormConfigContext.Provider value={cfg}>
        <FormBuilderInner />
      </globalFormConfigContext.Provider>
    </div>
  );
};
