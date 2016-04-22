import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { gridSelectRow }      from './../actions';

export class GridTable extends Component {
	render () {
		const { data, colNames, selectedLength, selectedPage, selectedItems, gridSelectRow } = this.props;
		let rowCount = 0;

		const headItems = colNames.map((x) => {
			return <th key={x.key} >{x.value}</th>	
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
  return bindActionCreators({ gridSelectRow }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridTable);
