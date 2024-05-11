import type { DependencyList } from 'react';
import { createContext, useContext, useEffect } from 'react';

export const ValidateContext = createContext<Set<() => boolean>>(new Set());
export function useValidate(onValidate: () => boolean, deps: DependencyList) {
  const ctx = useContext(ValidateContext);
  useEffect(() => {
    ctx.add(onValidate);
    return () => {
      ctx.delete(onValidate);
    };
  }, [deps]);
}
