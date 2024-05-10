import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export function uid() {
  return Date.now().toString(32) + Math.floor(Math.random() * 0xffff).toString(32);
}
export function isNum(v: unknown): v is number {
  return typeof v === 'number';
}
export function isStr(v: unknown): v is string {
  return typeof v === 'string';
}
export function isObj<T = Record<string, unknown>>(v: unknown): v is T {
  return typeof v === 'object' && v !== null;
}
export function isUndefined(v: unknown): v is undefined {
  return typeof v === 'undefined';
}
export function cs(...args: (string | Record<string, boolean> | boolean | null | undefined)[]) {
  const segs: string[] = [];
  args.forEach((arg) => {
    if (isObj(arg)) {
      Object.keys(arg).forEach((k) => {
        if (arg[k]) {
          segs.push(k.trim());
        }
      });
    } else if (isStr(arg) && arg.trim()) {
      segs.push(arg);
    }
  });
  return segs.join(' ');
}

export function useNonFirstEffect(effect: EffectCallback, deps: DependencyList) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    effect();
  }, deps);
}

export function formatDate(date?: Date | number) {
  if (!date) date = new Date();
  else if (isNum(date)) date = new Date(date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
}
