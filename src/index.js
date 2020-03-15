import React from 'react';
import ReactDOM from 'react-dom';
require('!style-loader!css-loader!semantic-ui-css/semantic.min.css');
import App from './components/App';

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();