import type { DefaultOptionType } from 'antd/es/select';

export interface FormFieldWidth {
  /** value，宽度值 */
  v: number;
  /** unit，宽度单位 */
  u: 'px' | '%';
}
export type BaseFormField = {
  id: string;
  name: string;
  width: FormFieldWidth;
};
export type SingleFormField = BaseFormField & {
  type: 'string' | 'number' | 'bool' | 'date';
  ux: {
    type: 'input' | 'number-input' | 'select' | 'radio' | 'switch' | 'checkbox' | 'picker';
    options?: DefaultOptionType[];
  };
};
export type ArrayFormField = BaseFormField & {
  type: 'array';
  itemType: SingleFormField['type'];
  ux: {
    type: 'input' | 'number-input' | 'select' | 'checkbox';
    options?: DefaultOptionType[];
  };
};
export type NestFormField = BaseFormField & {
  type: 'nest';
  items: FormField[];
};
export type NestArrayFormField = BaseFormField & {
  type: 'nest-array';
  items: FormField[];
};
export type FormField = SingleFormField | ArrayFormField | NestFormField | NestArrayFormField;
