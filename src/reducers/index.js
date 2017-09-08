import categories from './categories.js';
import homeworks from './homeworks.js';
import { combineReducers } from 'redux';
import taskForm from './taskForm.js';

export default combineReducers({
	categories,
	homeworks,
	taskForm
})