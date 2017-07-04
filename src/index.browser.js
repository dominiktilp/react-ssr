import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component initState={window.INIT_STATE} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept();
}
