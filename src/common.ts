export interface FormFieldWidth {
  /** value，宽度值 */
  v: number;
  /** unit，宽度单位。 '-' 代表继承表单全局配置的默认宽度 */
  u: 'px' | '%' | '-';
}
export type BaseFormField = {
  id: string;
  name: string | number;
  tip?: string;
  width: FormFieldWidth;
};
export interface SelectOption {
  label: string;
  value: string;
}
/** 占位字段，用于支撑排版，没有实际字段内容 */
export type PlaceholderFormField = BaseFormField & {
  type: 'placeholder';
};
export type SingleFormField = BaseFormField & {
  type: 'string' | 'number' | 'bool' | 'date';
  ux: {
    type: 'input' | 'number-input' | 'select' | 'radio' | 'switch' | 'picker';
    options?: (string | number)[];
  };
};
export type ArrayFormField = BaseFormField & {
  type: 'array';
  itemType: 'string' | 'number' | 'date';
  ux: {
    type: 'input' | 'number-input' | 'select' | 'checkbox';
    options?: (string | number)[];
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
export type FormField =
  | PlaceholderFormField
  | SingleFormField
  | ArrayFormField
  | NestFormField
  | NestArrayFormField;
