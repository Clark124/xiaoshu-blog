import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as userReducer} from './Header/'
import {reducer as writerReducer} from './Writer/'
import {reducer as userArticleReducer} from './User/'
import {reducer as articlePageReducer} from './ArticlePage/'
import {reducer as attentionReducer} from './Attention/'
import {reducer as favoriteReducer} from './Favorite/'
import {reducer as homeReducer} from './Home/'
import Perf from 'react-addons-perf'
import  immutable from 'redux-immutable-state-invariant'
const win = window
win.Perf = Perf

const reducer = combineReducers({
    user: userReducer,
    writer:writerReducer,
    userArticle:userArticleReducer,
    articlePage: articlePageReducer,
    attention: attentionReducer,
    favorite: favoriteReducer,
    home: homeReducer

})

const middlewares = [thunkMiddleware];
if(process.env.NODE_ENV !== 'production'){
    middlewares.push(immutable())
}
const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);