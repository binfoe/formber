import { useContext, useMemo, type FC } from 'react';
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
import { FormSettingsContext } from '@/form';
import { getFieldDefaultWidth } from '@/builder/field';

export const FieldList: FC<{ fields: FormField[]; parentPath: (string | number)[] }> = ({
  fields,
  parentPath,
}) => {
  if (!fields.length) {
    return (
      <div className='flex h-8 items-center px-2 text-center text-xs text-disabled-text'>
        无字段
      </div>
    );
  }
  return fields.map((field) => <Field key={field.id} field={field} parentPath={parentPath} />);
};

export const Field: FC<{
  field: FormField;
  parentPath: (string | number)[];
}> = ({ field, parentPath }) => {
  const type = field.type;
  const cfg = useContext(FormSettingsContext);
  const width = useMemo(
    () => (field.width?.u && field.width.u !== '-' ? field.width : getFieldDefaultWidth(cfg, type)),
    [field.width, cfg, type],
  );

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
