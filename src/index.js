import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom'

// Import of CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// serviceWorker.unregister();
