import type { DefaultOptionType } from 'antd/es/select';
import type { GlobalFormConfig } from '../setting';
import type {
  FormFieldWidth,
  ArrayFormField,
  BaseFormField,
  FormField,
  SingleFormField,
} from './common';
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
  const x = newSingleFormField(cfg, data) as unknown as ArrayFormField;
  x.type = 'array';
  x.itemType = 'string';
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

const StrUxTypeOptions: DefaultOptionType[] = [
  {
    label: '输入框',
    value: 'input',
  },
  {
    label: '下拉选择',
    value: 'select',
  },
  {
    label: '单选按钮',
    value: 'radio',
  },
];
const NumUxTypeOptions: DefaultOptionType[] = [
  {
    label: '输入框',
    value: 'number-input',
  },
  {
    label: '下拉选择',
    value: 'select',
  },
  {
    label: '单选按钮',
    value: 'radio',
  },
];
const DateUxTypeOptions: DefaultOptionType[] = [
  {
    label: '选择日期',
    value: 'picker',
  },
  {
    label: '输入框',
    value: 'input',
  },
  {
    label: '下拉选择',
    value: 'select',
  },
];
const BoolUxTypeOptions: DefaultOptionType[] = [
  {
    label: '切换按钮',
    value: 'switch',
  },
  {
    label: '单选按钮',
    value: 'radio',
  },
];
export function getUxTypeOptions(type: FormField['type']) {
  if (type === 'string') return StrUxTypeOptions;
  if (type === 'number') return NumUxTypeOptions;
  if (type === 'bool') return BoolUxTypeOptions;
  if (type === 'date') return DateUxTypeOptions;
  return [];
}

export function getFieldDefaultUx(type: FormField['type']): SingleFormField['ux'] {
  if (type === 'string') return { type: 'input' };
  if (type === 'date') return { type: 'picker' };
  if (type === 'number') return { type: 'number-input' };
  if (type === 'bool') return { type: 'switch' };
  return { type: 'input' };
}
