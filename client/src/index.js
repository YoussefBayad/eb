import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import store from './redux/createStore';
// App
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
