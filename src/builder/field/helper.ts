import { getFieldDefaultUx } from '../edit/helper';
import type {
  ArrayFormField,
  BaseFormField,
  FormField,
  SingleFormField,
  NestFormField,
  NestArrayFormField,
} from '../../common';
import type { FormConfig } from '@/form';
import { uid } from '@/util';

export function newSingleFormField(
  data?: Partial<
    BaseFormField & {
      type: FormField['type'];
    }
  >,
) {
  const type = data?.type ?? 'string';
  return {
    id: uid(),
    name: data?.name ?? '',
    tip: data?.tip,
    type,
    width: data?.width ?? { v: 0, u: '-' },
    ux: getFieldDefaultUx(type),
  } as SingleFormField;
}
export function newArrayFormField(data?: Partial<BaseFormField>) {
  const x = newSingleFormField({ ...data, type: 'array' }) as unknown as ArrayFormField;
  x.itemType = 'string';
  return x;
}
export function newNestFormField(data?: Partial<BaseFormField>) {
  const x = newSingleFormField({ ...data, type: 'nest' }) as unknown as NestFormField;
  x.items = [newSingleFormField()];
  return x;
}
export function newNestArrayFormField(data?: Partial<BaseFormField>) {
  const x = newSingleFormField({ ...data, type: 'nest-array' }) as unknown as NestArrayFormField;
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
