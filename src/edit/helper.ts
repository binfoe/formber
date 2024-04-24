import type { DefaultOptionType } from 'antd/es/select';
import type { ArrayFormField, FormField, SingleFormField } from '@/field';

export const FormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export const SingleFieldTypeOptions = [
  {
    label: '文本',
    value: 'string',
  },
  { label: '数值', value: 'number' },
  { label: '日期', value: 'date' },
  { label: '布尔', value: 'bool' },
];
export const FieldTypeOptions = [
  ...SingleFieldTypeOptions,
  { label: '简单数组', value: 'array' },
  { label: '嵌套对象', value: 'nest' },
  { label: '对象数组', value: 'nest-array' },
  { label: '占位空白', value: 'placeholder' },
];

export function isUxNeedOpts(uxType: SingleFormField['ux']['type']) {
  return uxType === 'select' || uxType === 'radio' || uxType === 'checkbox';
}

export function getFieldDefaultUx(
  type: FormField['type'],
): SingleFormField['ux'] | ArrayFormField['ux'] {
  if (type === 'string') return { type: 'input' };
  if (type === 'date') return { type: 'picker' };
  if (type === 'number') return { type: 'number-input' };
  if (type === 'bool') return { type: 'switch' };
  if (type === 'array') return { type: 'input' };
  return { type: 'input' };
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
const ArrayUxTypeOptions: DefaultOptionType[] = [
  {
    label: '输入框',
    value: 'input',
  },
  { label: '下拉多选', value: 'select' },
  { label: '多选项', value: 'checkbox' },
];
export function getUxTypeOptions(type: FormField['type']) {
  if (type === 'string') return StrUxTypeOptions;
  if (type === 'number') return NumUxTypeOptions;
  if (type === 'bool') return BoolUxTypeOptions;
  if (type === 'date') return DateUxTypeOptions;
  if (type === 'array') return ArrayUxTypeOptions;
  return [];
}
