import React from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/category.js';
import CategoryList from './CategoryList.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	err: null,
    	isLoaded: false
    }
  }

  componentWillMount() {
  	const { dispatch } = this.props;
  	dispatch(getAllCategories()).then(() => {
  		this.setState({
  			isLoaded: true
  		})
  	}).catch(err => {
  		console.log(err);
  		this.setState({
  			err
  		})
  	})
  }
  render() {
  	const { err, isLoaded } = this.state;
  	const { allCategories } = this.props;

  	if(err) return <div>Ошибка при загрузке..</div>

  	if(isLoaded) {
    	return (
    	  <div>
    	  	<CategoryList categories={allCategories} />
    	  </div>
    	);
    } else {
    	return (
				<div>Загрузка...</div>
    	)
    }
  }
}

const mapStateToProps = ({ categories }) => ({
	allCategories: categories.categoryList
})

export default connect(mapStateToProps)(Header);
