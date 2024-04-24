import type { GlobalFormConfig } from '../setting';
import type {
  FormFieldWidth,
  ArrayFormField,
  BaseFormField,
  FormField,
  SingleFormField,
  NestFormField,
} from './common';
import { getFieldDefaultUx } from '@/edit/helper';
import { uid } from '@/util';

export function newSingleFormField(
  cfg: GlobalFormConfig,
  data?: Partial<
    BaseFormField & {
      type: FormField['type'];
    }
  >,
) {
  const type = data?.type ?? 'string';
  return {
    id: uid(),
    name: '',
    type,
    width: data?.width ?? getFieldDefaultWidth(cfg, type),
    ux: getFieldDefaultUx(type),
  } as SingleFormField;
}
export function newArrayFormField(cfg: GlobalFormConfig, data?: Partial<BaseFormField>) {
  const x = newSingleFormField(cfg, { ...data, type: 'array' }) as unknown as ArrayFormField;
  x.itemType = 'string';
  return x;
}
export function newNestFormField(cfg: GlobalFormConfig, data?: Partial<BaseFormField>) {
  const x = newSingleFormField(cfg, { ...data, type: 'nest' }) as unknown as NestFormField;
  x.items = [newSingleFormField(cfg)];
  return x;
}

export function getFieldDefaultWidth(
  cfg: GlobalFormConfig,
  type: FormField['type'],
): FormFieldWidth {
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
