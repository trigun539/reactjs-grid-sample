import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { gridLengthChange }   from './../actions';

export class GridActions extends Component {

	render () {
		const { selectedLength, gridLengthChange } = this.props;
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
			<div id="grid-actions" className="col-md-12">
				<div className="btn-group grid-actions-main" role="group">
					<button onClick={ this.createCSV } className="btn btn-success"><i className="glyphicon glyphicon-floppy-save"></i></button>
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

	createCSV () {
		const data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
		let csvContent = "data:text/csv;charset=utf-8,";
		let dataString = '';

		data.forEach(function(infoArray, index){

			dataString = infoArray.join(",");
			csvContent += index < data.length ? dataString+ "\n" : dataString;

		}); 

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_data.csv");

		link.click();
	}
}

function select (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gridLengthChange }, dispatch);
}

export default connect(select, mapDispatchToProps)(GridActions);
