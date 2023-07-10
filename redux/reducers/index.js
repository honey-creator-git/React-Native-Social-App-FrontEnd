
import { combineReducers } from "redux";
import user from './userReducers.js'
import toolkit from './toolkitReducers.js'
import forum from './forumReducers.js'

const rootReducer = combineReducers({
    user,
    toolkit,
    forum,
});
export default rootReducer;