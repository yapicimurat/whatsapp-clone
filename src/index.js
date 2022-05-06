import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./app/store/store";
import {Provider} from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App page="welcome" />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById("root")
);