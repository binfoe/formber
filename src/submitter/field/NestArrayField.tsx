import { useMemo, type FC } from 'react';
import { FieldList } from './Field';
import type { NestArrayFormField } from '@/common';
import { FieldLabel } from '@/builder/field';

export const NestArrayField: FC<{ field: NestArrayFormField; parentPath: string[] }> = ({
  field,
  parentPath,
}) => {
  const namePath = useMemo(() => [...parentPath, field.name], [parentPath]);
  return (
    <div className='mx-2'>
      <div className='border-border flex w-full items-center rounded-tl-md rounded-tr-md border border-b-0 border-solid bg-slate-100 px-2 py-2'>
        <FieldLabel field={field} />
      </div>
      <div className='border-border flex w-full flex-wrap gap-y-4 rounded-bl-md rounded-br-md border border-t-0 border-solid py-4'>
        <FieldList fields={field.items} parentPath={namePath} />
      </div>
    </div>
  );
};
