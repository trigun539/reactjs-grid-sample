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
						<i className="glyphicon glyphicon-floppy-save"></i>
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
		var csvContent = "data:text/csv;charset=utf-8,";
		var dataString;
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
					let rowColValue = /[,]/.test(rowCol) ? `"${rowCol}"` : rowCol;
					selectedRow.push(rowColValue);
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
						let rowColValue = /[,]/.test(rowCol) ? `"${rowCol}"` : rowCol;
						rowData.push(rowColValue);
					}

					data.push(rowData); 
				}
			}
		}
	
		data.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += index < data.length ? dataString+ "\n" : dataString;
		}); 

		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_grid_export.csv");

		link.click(); // This will download the data file named "my_data.csv".
	}
}

function select (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gridLengthChange }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridActions);
