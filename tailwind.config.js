/* global process */
import { themeColors } from './src/theme-colors';

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: themeColors,
  },
  content: process.env.FORMERDEMO ? ['./src/**/*.tsx', './demo/**/*.tsx'] : ['./src/**/*.tsx'],
};
