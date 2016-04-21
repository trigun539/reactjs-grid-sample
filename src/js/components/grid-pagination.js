import React, { Component }                  from 'react';
import bootstrap                             from 'bootstrap';
import { connect }                           from 'react-redux';
import { bindActionCreators }                from 'redux';
import { gridPageChange, gridPageSetChange } from './../actions';

export class GridPagination extends Component {
	render () {
		const { 
			recordCount, 
			selectedPage, 
			selectedLength, 
			setLength, 
			selectedSet,
			gridPageChange, 
			gridPaginationStartChange,
			gridPageSetChange
		} = this.props;

		const pageBtns = [];
		const pages    = Math.ceil(recordCount / selectedLength);
		const pageSets = Math.ceil(pages / setLength);

		// Adding Previous
		if (selectedPage !== 1 && pages > 1) {
			pageBtns.push(
					<li key="grid-pagination-prev" onClick={ (e) => { e.preventDefault(); gridPageChange(selectedPage - 1); }}>
						<a href="#" aria-label="Previous">
							<span aria-hidden="true">{ `${String.fromCharCode(60) }${String.fromCharCode(60) }` }</span>
						</a>
					</li>
			);	
		}

		// Prev Set
		if (selectedSet !== 1 && pageSets > 1) {
			pageBtns.push(
					<li 
						key="grid-pagination-set-prev" 
						onClick={(e) => { 
							e.preventDefault(); 
							gridPageSetChange(selectedSet - 1);
						}}
					>
						<a href="#" aria-label="Next">
							<span aria-hidden="true">...</span>
						</a>
					</li>
			);
		}

		const startPage = setLength * (selectedSet - 1) + 1;
		for (let i = startPage; i < startPage + setLength; i++) {
			if (i <= pages) {
				pageBtns.push(
						<li 
							key={ `grid-pagination-page-${i}` } 
							className={ selectedPage === i ? 'active' : ''}
							onClick={ (e) => { e.preventDefault(); gridPageChange(i); }}><a href="#">{i}</a></li>
				);	
			}
		}

		// Next Set
		if (selectedSet + 1 <= pageSets) {
			pageBtns.push(
					<li 
						key="grid-pagination-set-next" 
						onClick={(e) => { 
							e.preventDefault(); 
							gridPageSetChange(selectedSet + 1);
						}}
					>
						<a href="#" aria-label="Next">
							<span aria-hidden="true">...</span>
						</a>
					</li>
			);
		}

		// Adding Next
		if (pages > 1 && selectedPage !== pages) {
			pageBtns.push(
					<li key="grid-pagination-next" onClick={ (e) => { e.preventDefault(); gridPageChange(selectedPage + 1); }}>
						<a href="#" aria-label="Next">
							<span aria-hidden="true">{ `${String.fromCharCode(62)}${String.fromCharCode(62)}` }</span>
						</a>
					</li>
			);
		}

		return (
			<div className="col-md-8 col-xs-8">
				<nav className="grid-pagination">
					<ul className="pagination">
						{ pageBtns }
					</ul>
				</nav>
			</div>
		);
	}
}

function select (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gridPageChange, gridPageSetChange }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridPagination);
