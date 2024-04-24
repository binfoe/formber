import { type FC } from 'react';
import type { PlaceholderFormField } from './common';
import { FieldLabel } from './Label';

export const PlaceholderField: FC<{ field: PlaceholderFormField }> = ({ field }) => {
  return (
    <>
      <FieldLabel className='mb-2' field={field} />
      <div className='p-2 text-xs text-gray-400'>占位空白</div>
    </>
  );
};
