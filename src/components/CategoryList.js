import React from 'react';
import { Link } from 'react-router-dom';

const renderCategories = (categories = []) => 
	categories.map((item, i) => (
		<li key={i} className="nav-item">
			<Link className="nav-link" to={"/categories/" + item.title}>
				{item.title}
			</Link>
		</li>
		)
	)

const CategoryList = (props) => {
	const { categories } = props;
	if(categories.length) {
		return (
			<ul className="nav">{renderCategories(categories)}</ul>
		)
	} else {
		return (
			<div>Загрузка</div>
		)
	}
}



export default CategoryList;