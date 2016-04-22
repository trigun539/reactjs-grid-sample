import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import List                   from './list';
import Grid                   from './grid';
import { gridFilter }         from './../actions';

export class App extends Component {

	keyUp (e) {
		const { gridFilter } = this.props;
		const searchText     = this.refs.searchInput.value;

		if (e.keyCode === 13) {
			gridFilter(searchText);
		}
	}

	render () {
		const { databases, grid } = this.props;

		return (
			<div id="app" className="row">
				<h1 className="col-md-12">Grid Test</h1>
				<div id="form" className="col-md-12">
					<input type="text" onKeyUp={ (e) => { this.keyUp(e); } } ref="searchInput" className="form-control" placeholder="Search" />
				</div>
				<Grid grid={ grid } />
			</div>
		);
	}
}

function select (state) {
  return {
    databases: state.databases,
		grid: state.grid
  };
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ gridFilter }, dispatch);
}

export default connect(select, mapDispatchToProps)(App);
