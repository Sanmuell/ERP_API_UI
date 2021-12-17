import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Headers from './Headers'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Headers />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();