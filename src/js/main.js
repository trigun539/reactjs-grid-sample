import React, { Component }          from 'react';
import ReactDOM                      from 'react-dom';
import { Provider }                  from 'react-redux';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import Layout                        from './components/layout';
import App                           from './components/app';
import SecondPage                    from './components/secondpage';
import { store }                     from './store';

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ hashHistory }>
			<Route path="/" component={ Layout }>
				<IndexRoute component={ App } />
				<Route path="second" component={ SecondPage }>
				</Route>
			</Route>
		</Router>
	</Provider>, document.getElementById('container')
);
