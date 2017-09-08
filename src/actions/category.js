import db, { tasks } from '../db.js';
import {
  SET_CATEGORY_LIST_START,
  SET_CATEGORY_LIST_END, 
  SET_CURRENT_CATEGORY,
  GET_CATEGORY_TASKS_END,
  GET_CATEGORY_TASKS_START,
  SET_NEW_TASK_TO_CATEGORY
} from '../appTypes.js';

function delay(time, data) {
  return new Promise((resolve) => { 
    setTimeout(() => {
    	resolve(data)
    }, time)
  });
}

export const getAllCategories = () => dispatch => {
	dispatch(getAllCategoriesStart());
	return delay(1000, db.categories).then((categories) => {
    dispatch(getAllCategoriesEnd(categories));
  })
}

const getAllCategoriesStart = () => ({
	type: SET_CATEGORY_LIST_START
})

const getAllCategoriesEnd = (categories) => ({
	type: SET_CATEGORY_LIST_END,
	payload: [ ...categories ]
})

export const getCategoryTasks = (categorySlug) => dispatch => {
	dispatch(getCategoryTasksStart());
	return delay(1000, tasks[categorySlug]).then((categoryTasks) => {
    dispatch(getCategoryTasksEnd(categoryTasks, categorySlug));
  })
}

const getCategoryTasksStart = () => ({
	type: GET_CATEGORY_TASKS_START
})

const getCategoryTasksEnd = (tasks, categorySlug) => ({
	type: GET_CATEGORY_TASKS_END,
	payload: {
		tasks,
		categorySlug
	}
})

export const setCurrentCategory = (categorySlug, categoryList) => {
  const categoryIndex = categoryList.map(category => category.title).indexOf(categorySlug);
  const currentCategory = categoryList[categoryIndex];
	return {
		type: SET_CURRENT_CATEGORY,
		payload: currentCategory
	}
}

export const setNewTaskToCategory = (task, category) => ({
	type: SET_NEW_TASK_TO_CATEGORY,
	payload: {
		task,
		category
	}
})