import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/state';
import { Provider as Web3Provider } from 'wagmi';
import ThemeProvider from './theme/theme';
import { connectors } from './connectors/connectors';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Web3Provider autoConnect connectors={connectors}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Web3Provider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
