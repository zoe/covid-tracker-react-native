import {applyMiddleware, compose} from 'redux';
import {createStore} from "redux";
import rootReducer from './root-reducer';
import thunk from "redux-thunk";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
}


const enhancer = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
