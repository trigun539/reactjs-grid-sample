import React, { Component }        from 'react';
import { connect }                 from 'react-redux';
import { bindActionCreators }      from 'redux';
import { gridSelectRow, gridSort } from './../actions';
import { naturalSort }             from './../utils';

export class GridTable extends Component {
	render () {
		const { colNames, selectedPage, selectedItems, gridSelectRow, gridSort, sort } = this.props;
		let { data } = this.props;
		let { selectedLength } = this.props;
		let rowCount = 0;

		if (selectedLength === 'All') {
			selectedLength = data.length;	
		}

		// Sort
		data = data.sort((a, b) => {
			if (sort.dir === 'asc') {
				if (typeof(a[sort.col]) === 'number') {
					return a[sort.col] - b[sort.col];
				} else {
					return a[sort.col].toString().toLowerCase().localeCompare(b[sort.col].toString().toLowerCase());
				}
			}	else {
				if (typeof(a[sort.col]) === 'number') {
					return b[sort.col] - a[sort.col];
				} else {
					return b[sort.col].toString().toLowerCase().localeCompare(a[sort.col].toString().toLowerCase());
				}
			}
		});
		
		const headItems = colNames.map((x) => {
			return <th 
				onClick={ () => { gridSort({ col: x.key, dir: sort.col === x.key && sort.dir === 'asc' ? 'desc' : 'asc'}); }} 
				key={x.key} >{x.value} { (() => {
					if (sort.col === x.key) {
						let icon = '/img/up.png';

						if (sort.dir !== 'asc') {
							icon = 'img/down.png';
						}	

						return <span className="label label-info"><img src={icon} width="10" /></span>;
					}	
				})()}</th>	
		});

		const bodyItems = [];
		const start = selectedPage * selectedLength - selectedLength;
		const end = selectedPage * selectedLength;

		if (data.length > 0) {
			for (let i = start; i < end; i++) {
				let colCount = 0;
		
				if (!data[i]) {
					break;	
				}

				const columnItems = colNames.map((col) => {
					const key = `row-${rowCount}-col${colCount++}`;
					return <th key={ key } >{ data[i][col.key] }</th>
				});

				bodyItems.push(<tr className={ selectedItems[data[i].id] ? 'success' : '' } onClick={ () => { gridSelectRow(data[i].id); }} key={`tr-${rowCount++}`}>{ columnItems }</tr>); 
			}
		}

		return (
			<table className="grid-table table table-bordered	table-striped">
				<thead>
					<tr>{ headItems }</tr>
				</thead>
				<tbody>{ bodyItems }</tbody>
			</table>
		);
	}
}

function select (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gridSelectRow, gridSort }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridTable);
