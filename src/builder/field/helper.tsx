import { getFieldDefaultUx } from '../edit/helper';
import type {
  ArrayFormField,
  BaseFormField,
  FormField,
  SingleFormField,
  NestFormField,
  NestArrayFormField,
} from '../../common';
import { type FormSettings } from '@/form';
import { isNum, uid } from '@/util';

function newFormField(
  name: string | number,
  type: FormField['type'],
  data?: Partial<BaseFormField>,
) {
  return {
    id: uid(),
    name: name,
    tip: data?.tip,
    type,
    width: data?.width ?? { v: 0, u: '-' },
  };
}
export function newSingleFormField(
  name: string | number,
  data?: Partial<Omit<SingleFormField, 'name'>>,
) {
  const type = data?.type ?? 'string';
  const x = newFormField(name, type, data) as SingleFormField;
  x.ux = data?.ux ?? getFieldDefaultUx(type);
  return x;
}
export function newArrayFormField(
  name: string | number,
  data?: Partial<Omit<ArrayFormField, 'type' | 'name'>>,
) {
  const x = newFormField(name, 'array', data) as ArrayFormField;
  x.itemType = data?.itemType ?? 'string';
  x.ux = data?.ux ?? { type: 'input' };
  return x;
}
export function newNestFormField(
  name: string | number,
  data?: Partial<Omit<NestFormField, 'type' | 'name'>>,
) {
  const x = newFormField(name, 'nest', data) as NestFormField;
  x.items = data?.items ?? [];
  return x;
}
export function newNestArrayFormField(
  name: string | number,
  data?: Partial<Omit<NestArrayFormField, 'type' | 'name'>>,
) {
  const x = newFormField(name, 'nest-array', data) as NestArrayFormField;
  x.items = data?.items ?? [];
  return x;
}

export function getFieldDefaultWidth(cfg: FormSettings, type: FormField['type']) {
  if (type === 'nest-array') return cfg.nestArrayFieldWidth;
  if (type === 'array') return cfg.arrayFieldWidth;
  if (type === 'nest') return cfg.nestFieldWidth;
  return cfg.singleFieldWidth;
}

const emptyLabels: Partial<Record<FormField['type'], string>> = {
  array: '普通数组',
  'nest-array': '对象数组',
  nest: '嵌套对象',
};
export function getFieldDisplayLabel(field: FormField) {
  if (isNum(field.name) || field.name)
    return (
      <span className='overflow-hidden text-ellipsis whitespace-nowrap text-leading-text'>
        {field.name}
      </span>
    );
  return (
    <span className='overflow-hidden text-ellipsis whitespace-nowrap text-gray-100'>
      {emptyLabels[field.type] ?? '普通字段'}
    </span>
  );
}
