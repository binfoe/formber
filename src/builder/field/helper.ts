import { getFieldDefaultUx } from '../edit/helper';
import type {
  ArrayFormField,
  BaseFormField,
  FormField,
  SingleFormField,
  NestFormField,
  NestArrayFormField,
} from '../../common';
import { type FormConfig } from '@/form';
import { uid } from '@/util';

function newFormField(type: FormField['type'], data?: Partial<BaseFormField>) {
  return {
    id: uid(),
    name: data?.name ?? '',
    tip: data?.tip,
    type,
    width: data?.width ?? { v: 0, u: '-' },
  };
}
export function newSingleFormField(data?: Partial<SingleFormField>) {
  const type = data?.type ?? 'string';
  const x = newFormField(type, data) as SingleFormField;
  x.ux = data?.ux ?? getFieldDefaultUx(type);
  return x;
}
export function newArrayFormField(data?: Partial<Omit<ArrayFormField, 'type'>>) {
  const x = newFormField('array', data) as ArrayFormField;
  x.itemType = data?.itemType ?? 'string';
  return x;
}
export function newNestFormField(data?: Partial<Omit<NestFormField, 'type'>>) {
  const x = newFormField('nest', data) as NestFormField;
  x.items = [newSingleFormField()];
  return x;
}
export function newNestArrayFormField(data?: Partial<Omit<NestArrayFormField, 'type'>>) {
  const x = newFormField('nest-array', data) as NestArrayFormField;
  x.items = [newSingleFormField()];
  return x;
}

export function getFieldDefaultWidth(cfg: FormConfig, type: FormField['type']) {
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
  return field.name || emptyLabels[field.type] || '普通字段';
}
