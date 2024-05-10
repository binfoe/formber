import type { FC } from 'react';
import type { NestFormField } from '../../common';
import { FieldLabel } from './Label';
import { FieldList } from './Field';

export const NestField: FC<{ field: NestFormField }> = ({ field }) => {
  return (
    <div className='mx-2'>
      <div className='flex w-full items-center rounded-tl-md rounded-tr-md border border-b-0 border-solid border-gray-300 bg-slate-100 px-2 py-2'>
        <FieldLabel field={field} />
      </div>
      <div className='flex w-full flex-wrap gap-y-4 rounded-bl-md rounded-br-md border border-t-0 border-solid border-gray-300 py-4'>
        <FieldList fields={field.items} />
      </div>
    </div>
  );
};
