import type { SelectOption, SingleFormField } from '@/common';

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
export const ArrayFieldTypeOptions = [
  {
    label: '文本',
    value: 'string',
  },
  { label: '数值', value: 'number' },
  { label: '日期', value: 'date' },
];
export const FieldTypeOptions = [
  ...SingleFieldTypeOptions,
  { label: '简单数组', value: 'array' },
  { label: '嵌套对象', value: 'nest' },
  { label: '对象数组', value: 'nest-array' },
  { label: '占位空白', value: 'placeholder' },
];

export function getFieldDefaultUx(type: SingleFormField['type']): SingleFormField['ux'] {
  if (type === 'string') return { type: 'input' };
  if (type === 'date') return { type: 'picker' };
  if (type === 'number') return { type: 'number-input' };
  if (type === 'bool') return { type: 'radio', options: ['是', '否'] };
  return { type: 'input' };
}

export const StrUxTypeOptions: SelectOption[] = [
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
export const NumUxTypeOptions: SelectOption[] = [
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
export const DateUxTypeOptions: SelectOption[] = [
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
export const BoolUxTypeOptions: SelectOption[] = [
  {
    label: '切换按钮',
    value: 'switch',
  },
  {
    label: '单选按钮',
    value: 'radio',
  },
];
export const ArrayUxTypeOptions: SelectOption[] = [
  {
    label: '输入框',
    value: 'input',
  },
  { label: '下拉多选', value: 'select' },
  { label: '多选项', value: 'checkbox' },
];
