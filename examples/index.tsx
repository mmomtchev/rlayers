import React from 'react';
import ReactDOM from 'react-dom';

import debug from 'rlayers/debug';

import App from './App';

debug('React 16/17 mode');
ReactDOM.render(<App />, document.getElementById('root'));
