import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import fetchReducer from './reducer/fetch_reducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['fetchReducer'],
};

const customMiddleWare = (store) => (next) => (action) => {
    next(action);
};

const reducers = combineReducers({
    fetchReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk, customMiddleWare)),
);

export const persistor = persistStore(store);

export default store;
