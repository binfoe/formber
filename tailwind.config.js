/* global process */
/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: process.env.FORMERDEMO ? ['./src/**/*.tsx', './demo/**/*.tsx'] : ['./src/**/*.tsx'],
};
