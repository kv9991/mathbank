import { 
	SET_TASKFORM_FIELD, 
	POST_NEW_TASK_START, 
	POST_NEW_TASK_END 
} from '../appTypes.js';

import { setNewTaskToCategory } from './category.js'

function delay(time, data) {
  return new Promise((resolve) => { 
    setTimeout(() => {
    	resolve(data)
    }, time)
  });
}


export const setTaskFormField = (value, field) => ({
	type: SET_TASKFORM_FIELD,
	payload: {
		[field]: value
	}
})

export const postNewTask = taskForm => dispatch => {
	dispatch(postNewTaskStart())
	return delay(1000, taskForm).then((newTask) => {
		dispatch(postNewTaskEnd(newTask));
		dispatch(setNewTaskToCategory(newTask))
	})
}

export const postNewTaskStart = () => ({
	type: POST_NEW_TASK_START
})

export const postNewTaskEnd = () => ({
	type: POST_NEW_TASK_END
})