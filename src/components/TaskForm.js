import React from 'react';
import { connect } from 'react-redux';
import { setTaskFormField, postNewTask } from '../actions/taskForm.js';

const renderCategoryList = categories => {
	return categories.map((category, i) => {
		return <option key={i} value={category.title}>{category.title}</option>
	}) 
}

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
  }

	componentWillReceiveProps() {
		const { allCategories, dispatch, taskForm } = this.props;
		if(taskForm.category === '' && allCategories.length) {
			dispatch(setTaskFormField(allCategories[0].title, 'category'));
		}
	}

	handleForm(value, field) {
		const { dispatch } = this.props;
		dispatch(setTaskFormField(value, field));
	}

	handleFormSubmit(e) {
		e.preventDefault()
		const { dispatch, taskForm } = this.props;
		dispatch(postNewTask(taskForm))
	}

  render() {
  	const { allCategories } = this.props;
  	const { taskForm } = this.props;
  	if(!taskForm.isHydrating) {
	    return (
	      <div>
	      	<h3>Добавление нового заданиявить</h3>
	      	<form className="form-group" onSubmit={(e) => {this.handleFormSubmit(e)}}>
	      		<div className="form-group">
					    <label htmlFor="description">Описание задачи</label>
					    <textarea defaultValue={taskForm.description} placeholder="Введите условие задания.." id="description" className="form-control" onInput={(e) => {this.handleForm(e.target.value, 'description')}} rows="3"></textarea>
					  </div>
					  <div className="form-group">
					    <label htmlFor="category">Категория</label>
					    <select defaultValue={taskForm.category} id="category" className="form-control" onChange={(e) => {this.handleForm(e.target.value, 'category')}} name="">
					      {renderCategoryList(allCategories)}
					    </select>
					  </div>
					  <button type="submit" className="btn btn-primary">Добавить</button>
					</form>
	      </div>
	    );
	  } else {
	  	return (
				<div>Сохраняю новое задание..</div>
	  	)
	  }
  }
}


const mapStateToProps = ({ categories, taskForm }) => ({
	allCategories: categories.categoryList,
	taskForm: taskForm
})

export default connect(mapStateToProps)(TaskForm);
