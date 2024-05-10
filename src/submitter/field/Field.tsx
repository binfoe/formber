import { useContext, type FC } from 'react';
import { SingleField } from './SingleField';
import { NestField } from './NestField';
import { ArrayField } from './ArrayField';
import { NestArrayField } from './NestArrayField';
import { PlaceholderField } from './PlaceholderField';
import type {
  ArrayFormField,
  FormField,
  NestArrayFormField,
  NestFormField,
  PlaceholderFormField,
  SingleFormField,
} from '@/common';
import { cs } from '@/util';
import { globalFormConfigContext } from '@/form';
import { getFieldDefaultWidth } from '@/builder/field';

export const FieldList: FC<{ fields: FormField[] }> = ({ fields }) => {
  return fields.map((field) => <Field key={field.id} field={field} />);
};

export const Field: FC<{
  field: FormField;
}> = ({ field }) => {
  const type = field.type;
  const cfg = useContext(globalFormConfigContext);
  const width =
    field.width?.u && field.width.u !== '-' ? field.width : getFieldDefaultWidth(cfg, type);

  return (
    <div
      style={{
        width: `${width.v}${width.u}`,
      }}
      className={cs(`relative flex flex-col`)}
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
    </div>
  );
};
