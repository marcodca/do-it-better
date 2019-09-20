import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Set the corresponding uri for production and development
const uri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://localhost:4000/graphql";

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
