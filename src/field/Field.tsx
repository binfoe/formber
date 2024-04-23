import { type FC } from 'react';
import type { FormField, SingleFormField } from './common';
import type { FieldControlProps } from './Control';
import { SingleField } from './SingleField';

export const Field: FC<
  FieldControlProps & {
    field: FormField;
  }
> = ({ field, ...props }) => {
  const type = field.type;
  if (type === 'nest-array') {
    return null;
  } else if (type === 'nest') {
    return null;
  } else if (type === 'array') {
    return null;
  } else {
    return <SingleField field={field as SingleFormField} {...props} />;
  }
};
