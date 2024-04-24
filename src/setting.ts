import { createContext } from 'react';
import type { FormFieldWidth } from './field';

export interface GlobalFormConfig {
  singleFieldWidth: FormFieldWidth;
  arrayFieldWidth: FormFieldWidth;
  nestFieldWidth: FormFieldWidth;
  nestArrayFieldWidth: FormFieldWidth;
}
export function newGlobalFormConfig() {
  return {
    singleFieldWidth: { v: 20, u: '%' },
    arrayFieldWidth: { v: 100, u: '%' },
    nestFieldWidth: { v: 100, u: '%' },
    nestArrayFieldWidth: { v: 100, u: '%' },
  } as GlobalFormConfig;
}
export const globalFormConfigContext = createContext({} as unknown as GlobalFormConfig);
