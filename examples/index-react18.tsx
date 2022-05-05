import React from 'react';
import ReactDOMClient from 'react-dom/client';

import debug from 'rlayers/debug';

import App from './App';

debug('React 18 mode');
ReactDOMClient.createRoot(document.getElementById('root')).render(<App />);
