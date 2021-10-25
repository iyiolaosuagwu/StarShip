import React from 'react';
import {
    View
} from 'react-native';
import Router from './router'
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router />
            </PersistGate>
        </Provider>
    );
};


export default App;
