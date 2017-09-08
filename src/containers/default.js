import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import Header from '../components/Header.js';
import TaskForm from '../components/TaskForm.js';

const DefaultContainer = (routeProps) => {	
	const Child = routeProps.routeComponent;
	return (
		<Route {...routeProps} render={props => {
			// console.log(props)  - перехватываем пропсы, которые генерирует нам React-Router (match объект)
			return (
				<div className="container">
					<Header />
					<TaskForm />
					<Child {...props} />
				</div>
			);
		}} />
	);
}

export default DefaultContainer;
