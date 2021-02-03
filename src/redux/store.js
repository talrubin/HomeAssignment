import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(
      sagaMiddleware
    )
  )
)
sagaMiddleware.run(rootSaga)

export default store;