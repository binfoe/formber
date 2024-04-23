import { Modal } from 'antd';
import { useContext, useState, type FC } from 'react';
import { FieldEdit } from './edit';
import { globalFormConfigContext, newGlobalFormConfig, type GlobalFormConfig } from './setting';
import type { FormField } from './field';
import { Field, newArrayFormField, newSingleFormField } from './field';
import { cs } from './util';

const FormBuilderInner: FC = () => {
  const ctx = useContext(globalFormConfigContext);
  const [fields, setFields] = useState<FormField[]>(() => [
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newSingleFormField(ctx),
    newArrayFormField(ctx),
  ]);
  const [editField, setEditField] = useState<FormField>();

  return (
    <>
      <Modal
        getContainer={() => document.body}
        open={!!editField}
        title='编辑字段'
        destroyOnClose
        onCancel={() => {
          setEditField(undefined);
        }}
        footer={false}
      >
        {editField && (
          <FieldEdit
            onSave={(data) => {
              Object.assign(editField, data);
              setFields((v) => v.slice()); // force update
              setEditField(undefined);
            }}
            onCancel={() => {
              setEditField(undefined);
            }}
            field={editField}
          />
        )}
      </Modal>
      <div className='flex flex-wrap items-start rounded-md border border-solid border-gray-300 px-2 py-4'>
        {fields.map((field, idx) => (
          <Field
            highlight={field === editField}
            onInsert={(position) => {
              setFields((v) => {
                v = v.slice();
                v.splice(position === 'pre' ? idx : idx + 1, 0, newSingleFormField(ctx));
                return v;
              });
            }}
            onEdit={() => {
              setEditField(field);
            }}
            onDel={() => {
              setFields((v) => {
                v = v.slice();
                v.splice(idx, 1);
                return v;
              });
            }}
            onSort={(position) => {
              if (position === 'post') {
                if (idx < fields.length) {
                  setFields((v) => {
                    v = v.slice();
                    const tmp = v[idx + 1];
                    v[idx + 1] = v[idx];
                    v[idx] = tmp;
                    return v;
                  });
                }
              } else {
                if (idx > 0) {
                  setFields((v) => {
                    v = v.slice();
                    const tmp = v[idx - 1];
                    v[idx - 1] = v[idx];
                    v[idx] = tmp;
                    return v;
                  });
                }
              }
            }}
            key={field.id}
            field={field}
          />
        ))}
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
      <div className='mb-4 flex items-end gap-2'>
        <div className='text-lg font-bold'>新表单</div>
        <button className='p-1 text-xs'>配置</button>
      </div>
      <globalFormConfigContext.Provider value={cfg}>
        <FormBuilderInner />
      </globalFormConfigContext.Provider>
    </div>
  );
};
