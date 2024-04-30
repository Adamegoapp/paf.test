import { createRoot } from 'react-dom/client';
import App from './app/App';

const rootElement = document.getElementById('root') as Element;
createRoot(rootElement).render(<App />);
