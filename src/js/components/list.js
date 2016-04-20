import React, { Component } from 'react';
import ListItem             from './list-item';

export default class List extends Component {
	render () {
		const { dbs } = this.props;
		const dbItems = dbs.map((db) => {
			return <ListItem db={ db } key={ db.id } />	
		});

		return (
			<div id="list" className="col-md-12">
				<div className="list-group">
					{dbItems}
				</div>
			</div>
		);
	}
}
