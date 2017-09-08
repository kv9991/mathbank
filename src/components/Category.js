import React from 'react';
import { connect } from 'react-redux'; 
import { getCategoryTasks, setCurrentCategory } from '../actions/category.js';

const renderTasks = (tasks) => 
	tasks.map((task, i) => <li key={i}>{task.description}</li>)

const isCategoryEmpty = (categorySlug, allCategories) => {
	for(var i = 0; i < allCategories.length; i++) {
		if(allCategories[i].title == categorySlug) {
			//return (allCategories[i].tasks.length == 0)
			return !allCategories[i].isTasksLoaded
		}
	}
}

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			err: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const { dispatch, match, isCategoriesHydrating, allCategories } = nextProps;
		const categorySlug = match.params.category;
		console.log(isCategoryEmpty(categorySlug, allCategories))
		if(isCategoryEmpty(categorySlug, allCategories) && !isCategoriesHydrating) {
			this.setState({ isLoaded: false });
			this.getCategoryTasks(categorySlug);
		} else {
			dispatch(setCurrentCategory(categorySlug, allCategories))
			this.setState({ isLoaded: true })
		}
	}

	componentDidMount() {
		this.setState({ isLoaded: true })
	}

	getCategoryTasks(categorySlug) {
		const { dispatch } = this.props;
		dispatch(getCategoryTasks(categorySlug)).then(() => {
			this.setState({ isLoaded: true })
		}).catch(err => {
			this.setState({ err })
		})
	}

	render() {
		const { category } = this.props.match.params
		const { currentCategory, isCategoriesHydrating } = this.props;
		const { isLoaded, err } = this.state;
		if(err) return <div>Ошибка при загрузке категории</div>
		if(!isCategoriesHydrating && isLoaded && currentCategory) {
			return (
				<div>
					<h2>Категория: {currentCategory.title}</h2>
					<b>Задания из категории:</b>
					<ul>{renderTasks(currentCategory.tasks)}</ul>
				</div>
			)
		} else {
			return (
				<div>Идёт загрузка..</div>
			)
		}
	}
}

const mapStateToProps = ({ categories }) => ({
	isCategoriesHydrating: categories.isHydrating,
	currentCategory: categories.currentCategory,
	allCategories: categories.categoryList
})

export default connect(mapStateToProps)(Category);