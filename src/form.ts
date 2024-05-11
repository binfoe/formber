import { createContext } from 'react';
import type { FormField, FormFieldWidth } from './common';
export interface FormSchema {
  fields: FormField[];
  settings: FormSettings;
}
export function newFormSchema(options?: Partial<Omit<FormSchema, 'name'>>): FormSchema {
  return {
    settings: options?.settings ?? newFormDefaultSettings(),
    fields: options?.fields ?? [],
  };
}
export interface FormSettings {
  singleFieldWidth: FormFieldWidth;
  arrayFieldWidth: FormFieldWidth;
  nestFieldWidth: FormFieldWidth;
  nestArrayFieldWidth: FormFieldWidth;
}
export function newFormDefaultSettings() {
  return {
    singleFieldWidth: { v: 20, u: '%' },
    arrayFieldWidth: { v: 100, u: '%' },
    nestFieldWidth: { v: 100, u: '%' },
    nestArrayFieldWidth: { v: 100, u: '%' },
  } as FormSettings;
}
export const globalFormConfigContext = createContext({} as unknown as FormSettings);

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
