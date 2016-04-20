import React, { Component } from 'react';

export default class GridTable extends Component {
	render () {
		const { data, colNames, selectedLength, selectedPage } = this.props;
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
				
				const columnItems = colNames.map((col) => {
					const key = `row-${rowCount}-col${colCount++}`;
					return <th key={ key } >{ data[i][col.key] }</th>
				});

				bodyItems.push(<tr key={`tr-${rowCount++}`}>{ columnItems }</tr>); 
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
