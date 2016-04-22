import React, { Component } from 'react';
import { Link }             from 'react-router';

export default class SecondPage extends Component {

	render () {
		return (
			<div id="app" className="row">
				<h1 className="col-md-12">Single Page Application Example</h1>
				<Link to="/" className="btn btn-info">Go to Grid</Link>
			</div>
		);
	}
}
