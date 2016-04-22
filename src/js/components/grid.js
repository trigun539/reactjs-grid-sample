import React, { Component } from 'react';
import GridActions          from './grid-actions';
import GridTable            from './grid-table';
import GridPagination       from './grid-pagination';

export default class Grid extends Component {
	render () {
		const { grid } = this.props;
		const {
			items,
			selectedItems,
			selectedLength,
			selectedPage,
			selectedSet,
			setLength,
			colNames,
			sort
		} = grid;

		return (
			<div id="grid" className="col-md-12">
				<div className="row">
					<GridActions items={ items } selectedPage={ selectedPage } colNames={ colNames } selectedItems={ selectedItems } selectedLength={ selectedLength } />

					<GridPagination 
						recordCount={ items.length } 
						selectedPage={ selectedPage } 
						selectedLength={ selectedLength } 
						setLength={ setLength }
						selectedSet={ selectedSet }/>	

				</div>
				
				<GridTable 
					data={ items } 
					selectedItems={ selectedItems } 
					colNames={ colNames } 
					selectedLength={ selectedLength } 
					selectedPage={ selectedPage }
					sort={ sort } />

				<GridPagination 
					recordCount={ items.length } 
					selectedPage={ selectedPage } 
					selectedLength={ selectedLength } 
					setLength={ setLength }	
					selectedSet={ selectedSet }/>	

			</div>
		);
	}
}
