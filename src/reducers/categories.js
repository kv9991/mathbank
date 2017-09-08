import {
  SET_CATEGORY_LIST_START,
  SET_CATEGORY_LIST_END, 
  GET_CATEGORY_TASKS_END,
  GET_CATEGORY_TASKS_START,
  SET_CURRENT_CATEGORY,
  SET_NEW_TASK_TO_CATEGORY
} from '../appTypes.js';

const initialState = {
  isHydrating: false,
  currentCategory: null,
  categoryList: []
}

const categories = (state = {...initialState}, action) => {
  switch (action.type) {
    case SET_CATEGORY_LIST_START:
      return {
        ...state,
        categoryList: [],
        isHydrating: true
      }
    case SET_CATEGORY_LIST_END:
      return {
        ...state,
        isHydrating: false,
        categoryList: [
          ...state.categoryList,
          ...action.payload.map((category) => ({
            ...category,
            isTasksLoaded: false
          }))
        ]
      }
    case GET_CATEGORY_TASKS_START:
      return {
        ...state,
        isHydrating: true
      }
    case GET_CATEGORY_TASKS_END:
      const { categorySlug, tasks } = action.payload;
      const currentCategorySlug = action.payload.categorySlug;
      const categoryIndex = state.categoryList.map(category => category.title).indexOf(categorySlug);
      state.categoryList[categoryIndex].tasks = state.categoryList[categoryIndex].tasks.concat(tasks);
      state.categoryList[categoryIndex].isTasksLoaded = true;
      return {
        ...state,
        isHydrating: false
      }
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      }
    case SET_NEW_TASK_TO_CATEGORY:
      const index = state.categoryList.map(category => category.title).indexOf(action.payload.task.category);
      if(state.currentCategory.title == action.payload.task.category) {
        state.categoryList[index] = {
          ...state.categoryList[index],
          tasks: [
            ...state.categoryList[index].tasks,
            action.payload.task
          ]
        }
        return {
          ...state,
          currentCategory: {
            ...state.currentCategory,
            tasks: [
              action.payload.task,
              ...state.currentCategory.tasks
            ]
          }
        }
      } else {
        state.categoryList[index] = {
          ...state.categoryList[index],
          tasks: [
            ...state.categoryList[index].tasks,
            action.payload.task
          ]
        }
        return state;
      }

    default: 
      return { ...state }
  }
}

export default categories;