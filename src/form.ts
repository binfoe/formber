import { createContext } from 'react';
import type { FormField, FormFieldWidth } from './common';
export interface Form {
  name: string;
  fields: FormField[];
  config: FormConfig;
}
export function newForm(name?: string): Form {
  return {
    name: name ?? '新表单',
    config: newFormDefaultConfig(),
    fields: [],
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
