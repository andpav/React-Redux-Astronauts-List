import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../ducks';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../ducks', () => {
      const nextReducer = require('../ducks');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
