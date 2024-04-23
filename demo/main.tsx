import { createRoot } from 'react-dom/client';
import { DemoApp } from './App';

const $root = document.getElementById('app');
if ($root) {
  createRoot($root).render(<DemoApp />);
} else {
  console.error('missing root element');
}
