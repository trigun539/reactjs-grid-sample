import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import List                   from './list';
import Grid                   from './grid';
import Summary                from './summary';

export class App extends Component {
	
	render () {
		const { databases, grid } = this.props;

		return (
			<div id="app" className="row">
				<h1 className="col-md-12">Grid Test</h1>
				<div id="form" className="col-md-12">
					<input type="text" className="form-control" placeholder="Database, Record, Area" />
				</div>
				<Summary />
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

export default connect(select)(App);
