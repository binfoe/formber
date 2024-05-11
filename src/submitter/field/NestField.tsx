import { useMemo, type FC } from 'react';
import { FieldList } from './Field';
import { FieldCard } from './Card';
import type { NestFormField } from '@/common';
import { FieldLabel } from '@/builder/field';

export const NestField: FC<{ field: NestFormField; parentPath: (string | number)[] }> = ({
  field,
  parentPath,
}) => {
  const namePath = useMemo(() => [...parentPath, field.name], [parentPath]);
  return (
    <FieldCard label={<FieldLabel field={field} />}>
      <FieldList fields={field.items} parentPath={namePath} />
    </FieldCard>
  );
};
