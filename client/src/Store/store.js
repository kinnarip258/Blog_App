//========================== Load Modules Start ===========================

import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducers/Reducer';

//========================== Load Modules End =============================

//============================= Store Start =============================

//============================= Debug The Application's State Changes =============================
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); 

//createstore
//pass the reducer
//ReduxThunk as middleware
//compose middleware and composeEnhancers
const store = createStore(
    Reducers,
    compose(applyMiddleware(ReduxThunk), composeEnhancers || compose)
)

//============================= Store End =============================

//============================= Export Default Start =============================

export default store;

//============================= Export Default End =============================
