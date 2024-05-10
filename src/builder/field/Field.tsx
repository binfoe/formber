import { useContext, useEffect, useState, type FC } from 'react';
import { Modal, message } from 'antd';
import { FieldEdit } from '../edit';
import type {
  ArrayFormField,
  FormField,
  NestArrayFormField,
  NestFormField,
  PlaceholderFormField,
  SingleFormField,
} from '../../common';
import { FieldControl, type FieldControlProps } from './Control';
import { SingleField } from './SingleField';
import { NestField } from './NestField';
import { ArrayField } from './ArrayField';
import { getFieldDefaultWidth, newSingleFormField } from './helper';
import { NestArrayField } from './NestArrayField';
import { PlaceholderField } from './PlaceholderField';
import { cs } from '@/util';
import { globalFormConfigContext } from '@/form';

function swap<T>(arr: T[], ia: number, ib: number) {
  const tmp = arr[ib];
  arr[ib] = arr[ia];
  arr[ia] = tmp;
}
export const FieldList: FC<{ fields: FormField[] }> = ({ fields }) => {
  const [copyFields, setFields] = useState<FormField[]>([]);
  useEffect(() => {
    setFields(fields ? fields.slice() : []);
  }, [fields]);
  const updateFields = (newFields: FormField[]) => {
    setFields(newFields);
  };
  return copyFields.map((field, idx) => (
    <Field
      onInsert={(position) => {
        const v = copyFields.slice();
        v.splice(position === 'pre' ? idx : idx + 1, 0, newSingleFormField());
        updateFields(v);
      }}
      onEdit={(data) => {
        Object.assign(field, data);
        setFields((v) => v.slice());
      }}
      onDel={() => {
        if (copyFields.length <= 1) {
          return message.error('至少需要一个字段');
        }
        const v = copyFields.slice();
        v.splice(idx, 1);
        updateFields(v);
      }}
      onSort={(position) => {
        if (position === 'post') {
          if (idx < fields.length) {
            swap(copyFields, idx, idx + 1);
            updateFields(copyFields.slice());
          }
        } else {
          if (idx > 0) {
            swap(copyFields, idx - 1, idx);
            updateFields(copyFields.slice());
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
  }
> = ({ field, onEdit, ...props }) => {
  const type = field.type;
  const [editOpen, setEditOpen] = useState(false);
  const [ctrlVis, setCtrlVis] = useState(false);
  const cfg = useContext(globalFormConfigContext);
  const width =
    field.width?.u && field.width.u !== '-' ? field.width : getFieldDefaultWidth(cfg, type);

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
          <NestArrayField field={field as NestArrayFormField} />
        ) : type === 'nest' ? (
          <NestField field={field as NestFormField} />
        ) : type === 'array' ? (
          <ArrayField field={field as ArrayFormField} />
        ) : type === 'placeholder' ? (
          <PlaceholderField field={field as PlaceholderFormField} />
        ) : (
          <SingleField field={field as SingleFormField} />
        )}
        <FieldControl
          mode={type === 'nest' || type === 'nest-array' ? 'float' : 'cover'}
          visible={ctrlVis || editOpen}
          onEdit={() => {
            setEditOpen(true);
          }}
          {...props}
        />
      </div>
    </>
  );
};
