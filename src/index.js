import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import DefaultRoute from './containers/default.js';
import Category from './components/Category.js';
import CategoryList from './components/CategoryList.js';
import store from './store.js';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<DefaultRoute exact path="/categories/:category" routeComponent={Category} />
					<DefaultRoute exact path="/categories" routeComponent={CategoryList} />
					<Redirect to="/categories" />
				</Switch>
  		</Router>
  	</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
