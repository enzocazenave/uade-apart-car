import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UiProvider } from './context/UiContext';
import './index.css';
import './styles/normalize.css';

createRoot(document.getElementById('root')).render(
    <UiProvider>
        <App />
    </UiProvider>
);