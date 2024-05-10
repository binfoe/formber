import { type FC } from 'react';
import type { PlaceholderFormField } from '@/common';
import { FieldLabel } from '@/builder/field';

export const PlaceholderField: FC<{ field: PlaceholderFormField }> = ({ field }) => {
  return (
    <>
      <FieldLabel className='mb-2' field={field} />
      <div>{/* placeholder */}</div>
    </>
  );
};
