import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

test('App will render h1', () => {
  const component = renderer.create(
    <App />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
