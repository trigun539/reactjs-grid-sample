import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { gridLengthChange }   from './../actions';

export class GridActions extends Component {

	render () {
		const { 
			selectedItems, 
			colNames, 
			selectedLength, 
			selectedPage,
			items,
			gridLengthChange 
		} = this.props;
		const lengths = [5, 10, 20, 50, 100, 'All'];
		const lengthItems = lengths.map((lengthItem) => {
			return ( 
							<li 
							key={lengthItem} 
							className={ lengthItem === selectedLength ? 'active' : ''}
							onClick={ (e) => { e.preventDefault(); gridLengthChange(lengthItem); }  }>
							<a href="#">{ lengthItem }</a>
							</li>
						 );
		});

		return (
			<div className="grid-actions col-md-4 col-xs-4">
			<div className="btn-group grid-actions-main" role="group">
			<button 
			onClick={ (e) => { this.createCSV(items, selectedPage, selectedLength, selectedItems, colNames); } } 
			className="btn btn-success">
			<img src="/img/export.png" width="20"/>		
			</button>
			</div>

			<div className="btn-group grid-actions-length" role="group">
			<div className="dropdown">
			<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
			{selectedLength}
			<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
			{lengthItems}
			</ul>
			</div>
			</div>
			</div>
		);
	}

	createCSV (items, selectedPage, selectedLength, selectedItems, colNames) {
		var data = [];
		var headerRow = [];

		// Adding header row
		for (let i = 0; i < colNames.length; i++) {
			headerRow.push(colNames[i].key);	
		}

		data.push(headerRow);

		var selectedItemKeys = Object.keys(selectedItems);
		if (selectedItemKeys.length > 1) {
			// Adding selected rows
			for (let i = 0; i < selectedItemKeys.length; i++) {
				let selectedRow = [];
				let rowItem = selectedItems[selectedItemKeys[i]];

				for (let j = 0; j < colNames.length; j++) {
					let rowCol = rowItem[colNames[j].key];
					selectedRow.push(rowCol);
				}

				data.push(selectedRow);
			}
		} else {
			const start = selectedPage * selectedLength - selectedLength;
			const end = selectedPage * selectedLength;

			if (items.length > 0) {
				for (let i = start; i < end; i++) {
					let rowItem = items[i];
					let rowData = [];

					for (let j = 0; j < colNames.length; j++) {
						let rowCol = rowItem[colNames[j].key];
						rowData.push(rowCol);
					}

					data.push(rowData); 
				}
			}
		}

		this.exportToCsv('my-grid-export.csv', data);
	}

	exportToCsv (filename, rows) {
		function processRow (row) {
			var finalVal = '';
			for (var j = 0; j < row.length; j++) {
				var innerValue = row[j] === null ? '' : row[j].toString();
				if (row[j] instanceof Date) {
					innerValue = row[j].toLocaleString();
				};
				var result = innerValue.replace(/"/g, '""');
				if (result.search(/("|,|\n)/g) >= 0)
					result = '"' + result + '"';
				if (j > 0)
					finalVal += ',';
				finalVal += result;
			}
			return finalVal + '\n';
		};

		var csvFile = '';

		for (var i = 0; i < rows.length; i++) {
			csvFile += processRow(rows[i]);
		}

		const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, filename);
		} else {
			const link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
				// Browsers that support HTML5 download attribute
				const url = URL.createObjectURL(blob);
				link.setAttribute("href", url);
				link.setAttribute("download", filename);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}
}

function select (state) {
	return {};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ gridLengthChange }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridActions);
