import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './styles/default.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
