import { createContext } from 'react';
import type { FormField, FormFieldWidth } from './common';
export interface FormSchema {
  name: string;
  fields: FormField[];
  config: FormConfig;
}
export function newFormSchema(
  name: string,
  options?: Partial<Omit<FormSchema, 'name'>>,
): FormSchema {
  return {
    name: name,
    config: options?.config ?? newFormDefaultConfig(),
    fields: options?.fields ?? [],
  };
}
export interface FormConfig {
  singleFieldWidth: FormFieldWidth;
  arrayFieldWidth: FormFieldWidth;
  nestFieldWidth: FormFieldWidth;
  nestArrayFieldWidth: FormFieldWidth;
}
export function newFormDefaultConfig() {
  return {
    singleFieldWidth: { v: 20, u: '%' },
    arrayFieldWidth: { v: 100, u: '%' },
    nestFieldWidth: { v: 100, u: '%' },
    nestArrayFieldWidth: { v: 100, u: '%' },
  } as FormConfig;
}
export const globalFormConfigContext = createContext({} as unknown as FormConfig);

const Sty = {
  controlHeight: 32,
};
export const globalStyleConfig = {
  Input: Sty,
  DatePicker: Sty,
  InputNumber: Sty,
  Select: Sty,
  Checkbox: Sty,
};
