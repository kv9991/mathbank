import {
  SET_TASKFORM_FIELD,
  POST_NEW_TASK_END,
  POST_NEW_TASK_START
} from '../appTypes.js';

const initialState = {
  description: '',
  category: '',
  isHydrating: false
}

const categories = (state = {...initialState}, action) => {
  switch (action.type) {
    case SET_TASKFORM_FIELD:
      return {
        ...state,
        ...action.payload
      }
    case POST_NEW_TASK_START: 
      return {
        ...state,
        isHydrating: true
      }
    case POST_NEW_TASK_END:
      return {
        ...state,
        isHydrating: false,
        
      }
    default: 
      return { ...state }
  }
}

export default categories;