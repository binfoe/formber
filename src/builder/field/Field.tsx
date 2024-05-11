import { useContext, useState, type FC } from 'react';
import { Modal } from 'antd';
import { FieldEdit } from '../edit';
import type {
  ArrayFormField,
  FormField,
  NestArrayFormField,
  NestFormField,
  PlaceholderFormField,
  SingleFormField,
} from '../../common';
import { useValidate } from '../validate';
import { FieldControl, type FieldControlProps } from './Control';
import { SingleField } from './SingleField';
import { NestField } from './NestField';
import { ArrayField } from './ArrayField';
import { getFieldDefaultWidth, newSingleFormField } from './helper';
import { NestArrayField } from './NestArrayField';
import { PlaceholderField } from './PlaceholderField';
import { cs, isStr } from '@/util';
import { globalFormConfigContext } from '@/form';

function swap<T>(arr: T[], ia: number, ib: number) {
  const tmp = arr[ib];
  arr[ib] = arr[ia];
  arr[ia] = tmp;
}
export const FieldList: FC<{
  fields: FormField[];
  /** 列表或其深度子元素发生更新。向上传递，通知最外层。 */
  // onUpdate: () => void;
  /** 列表发生变更 */
  onChange: (fields: FormField[]) => void;
}> = ({ fields, onChange }) => {
  const updateFields = (newFields: FormField[]) => {
    // setFields(newFields);
    // debugger;
    onChange(newFields);
  };
  if (!fields.length) {
    return (
      <div
        onClick={() => {
          const copyFields = fields.slice();
          copyFields.push(newSingleFormField(''));
          updateFields(copyFields);
        }}
        className='flex h-8 w-full cursor-pointer items-center px-2 text-xs text-gray-50 hover:text-gray-500'
      >
        暂无字段，点此添加
      </div>
    );
  }
  return fields.map((field, idx) => (
    <Field
      // onUpdate={onUpdate}
      onInsert={(position) => {
        const v = fields.slice();
        v.splice(position === 'pre' ? idx : idx + 1, 0, newSingleFormField(''));
        updateFields(v);
      }}
      onEdit={(data) => {
        Object.assign(field, data);
        updateFields(fields.slice());
      }}
      onDel={() => {
        const copyFields = fields.slice();
        copyFields.splice(idx, 1);
        updateFields(copyFields);
      }}
      onSort={(position) => {
        if (position === 'post') {
          if (idx < fields.length) {
            const copyFields = fields.slice();
            swap(copyFields, idx, idx + 1);
            updateFields(copyFields.slice());
          }
        } else {
          if (idx > 0) {
            const copyFields = fields.slice();
            swap(copyFields, idx - 1, idx);
            updateFields(copyFields);
          }
        }
      }}
      key={field.id}
      field={field}
    />
  ));
};

export const Field: FC<
  FieldControlProps & {
    onEdit: (data: Partial<FormField>) => void;
    field: FormField;
    /** 深度子元素发生更新。向上传递，通知最外层。 */
    // onUpdate: () => void;
  }
> = ({ field, onEdit, onInsert, onDel, onSort }) => {
  const type = field.type;
  const [editOpen, setEditOpen] = useState(false);
  const [ctrlVis, setCtrlVis] = useState(false);
  const cfg = useContext(globalFormConfigContext);
  const width =
    field.width?.u && field.width.u !== '-' ? field.width : getFieldDefaultWidth(cfg, type);
  const [err, setErr] = useState('');
  useValidate(() => {
    if (field.type !== 'placeholder' && isStr(field.name) && !field.name.trim()) {
      setErr('字段名称不能为空');
      return false;
    }
    if ((field.type === 'nest' || field.type === 'nest-array') && !field.items?.length) {
      setErr('至少添加一个字段');
      return false;
    }
    return true;
  }, [field]);
  return (
    <>
      <Modal
        getContainer={() => document.body}
        open={editOpen}
        title='编辑字段'
        destroyOnClose
        onCancel={() => {
          setEditOpen(false);
        }}
        footer={false}
      >
        {editOpen && (
          <FieldEdit
            onSave={(data) => {
              setEditOpen(false);
              setErr('');
              onEdit(data);
            }}
            onCancel={() => {
              setEditOpen(false);
            }}
            field={field}
          />
        )}
      </Modal>
      <div
        onMouseEnter={() => {
          setCtrlVis(true);
        }}
        onMouseLeave={() => {
          setCtrlVis(false);
        }}
        style={{
          width: `${width.v}${width.u}`,
        }}
        className={cs(`cursor relative flex flex-col`)}
      >
        {type === 'nest-array' ? (
          <NestArrayField
            onChange={() => {
              setErr('');
            }}
            field={field as NestArrayFormField}
          />
        ) : type === 'nest' ? (
          <NestField
            onChange={() => {
              setErr('');
            }}
            field={field as NestFormField}
          />
        ) : type === 'array' ? (
          <ArrayField field={field as ArrayFormField} />
        ) : type === 'placeholder' ? (
          <PlaceholderField field={field as PlaceholderFormField} />
        ) : (
          <SingleField field={field as SingleFormField} />
        )}
        {err && <div className='pl-2 pt-1 text-xs text-error'>{err}</div>}
        <FieldControl
          mode={type === 'nest' || type === 'nest-array' ? 'float' : 'cover'}
          visible={ctrlVis || editOpen}
          onEdit={() => {
            setEditOpen(true);
          }}
          onInsert={onInsert}
          onDel={onDel}
          onSort={onSort}
        />
      </div>
    </>
  );
};
