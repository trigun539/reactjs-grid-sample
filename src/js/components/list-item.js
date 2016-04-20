import React, { Component } from 'react';

export default class ListItem extends Component {
	render () {
		const { db } = this.props;

		return (
			<button type="button" className="list-group-item">{ db.name }</button>
		);
	}
}

