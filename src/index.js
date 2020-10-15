import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';

import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

// entry js render App component to index.html
ReactDOM.render(<App />, document.getElementById('root'));
