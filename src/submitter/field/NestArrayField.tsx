import { useMemo, type FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'antd';
import { FieldCard } from './Card';
import { FieldList } from './Field';
import type { FormField, NestArrayFormField } from '@/common';
import { FieldLabel, newNestFormField } from '@/builder/field';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
const SubNestField: FC<{
  parentPath: (string | number)[];
  items: FormField[];
  index: number;
  onDel: () => void;
}> = ({ parentPath, items, index, onDel }) => {
  const subField = useMemo(
    () =>
      newNestFormField(index, {
        width: { u: '-', v: 0 },
      }),
    [items, index],
  );
  const subPath = useMemo(() => [...parentPath, index], [index]);
  return (
    <FieldCard
      label={<FieldLabel field={subField} />}
      setting={
        <Button
          type='link'
          icon={<AntDesignDeleteOutlined />}
          onClick={() => {
            onDel();
          }}
        />
      }
    >
      <FieldList fields={items} parentPath={subPath} />
    </FieldCard>
  );
};
export const NestArrayField: FC<{ field: NestArrayFormField; parentPath: (string | number)[] }> = ({
  field,
  parentPath,
}) => {
  const { control } = useFormContext();
  const namePath = useMemo(() => [...parentPath, field.name], [parentPath]);
  const nameStrPath = useMemo(() => namePath.join('.'), [namePath]);
  const { fields, remove, append } = useFieldArray({
    control,
    name: nameStrPath,
    keyName: '__id',
  });

  return (
    <FieldCard
      wrapContent={false}
      label={<FieldLabel field={field} />}
      setting={
        <Button
          type='link'
          onClick={() => {
            append({});
          }}
          icon={<AntDesignPlusCircleOutlined />}
        />
      }
    >
      {!fields.length && (
        <div
          onClick={() => {
            append({});
          }}
          className='flex h-8 cursor-pointer items-center pl-2 text-xs text-gray-50 hover:text-secondary-text'
        >
          无元素，点击添加
        </div>
      )}
      {fields.map((f, i) => (
        <SubNestField
          key={f.__id}
          index={i}
          items={field.items}
          onDel={() => {
            remove(i);
          }}
          parentPath={namePath}
        />
      ))}
    </FieldCard>
  );
};
