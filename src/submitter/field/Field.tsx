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

export const FieldList: FC<{ fields: FormField[]; parentPath: string[] }> = ({
  fields,
  parentPath,
}) => {
  return fields.map((field) => <Field key={field.id} field={field} parentPath={parentPath} />);
};

export const Field: FC<{
  field: FormField;
  parentPath: string[];
}> = ({ field, parentPath }) => {
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
        <NestArrayField parentPath={parentPath} field={field as NestArrayFormField} />
      ) : type === 'nest' ? (
        <NestField parentPath={parentPath} field={field as NestFormField} />
      ) : type === 'array' ? (
        <ArrayField parentPath={parentPath} field={field as ArrayFormField} />
      ) : type === 'placeholder' ? (
        <PlaceholderField field={field as PlaceholderFormField} />
      ) : (
        <SingleField parentPath={parentPath} field={field as SingleFormField} />
      )}
    </div>
  );
};
