import { useState, type FC } from 'react';
import type { NestFormField } from '../../common';
import { FieldLabel } from './Label';
import { FieldList } from './Field';

export const NestField: FC<{ field: NestFormField; onUpdate: () => void }> = ({
  field,
  onUpdate,
}) => {
  const [items, setItems] = useState(field.items);
  return (
    <div className='mx-2'>
      <div className='border-border flex w-full items-center rounded-tl-md rounded-tr-md border border-b-0 border-solid bg-slate-100 px-2 py-2'>
        <FieldLabel field={field} />
      </div>
      <div className='border-border flex w-full flex-wrap gap-y-4 rounded-bl-md rounded-br-md border border-t-0 border-solid py-4'>
        <FieldList
          onChange={(items) => {
            field.items = items;
            setItems(items);
            onUpdate();
          }}
          onUpdate={onUpdate}
          fields={items}
        />
      </div>
    </div>
  );
};
