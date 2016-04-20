import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

export class Summary extends Component {
	render () {
		const { dbCount, rsCount, saCount } = this.props;

		return (
			<div id="summary" className="col-md-12">
				<div id="row">
					<h4 className="col-md-4 col-xs-4"><span className="label label-primary">Databases: {dbCount}</span></h4>
					<h4 className="col-md-4 col-xs-4"><span className="label label-success">Records: {rsCount}</span></h4>
					<h4 className="col-md-4 col-xs-4"><span className="label label-info">Areas: {saCount}</span></h4>
				</div>
			</div>
		);
	}
}

function select (state) {
  return {
    dbCount: state.summary.dbCount,
    rsCount: state.summary.rsCount,
    saCount: state.summary.saCount
  };
}

export default connect(select)(Summary);
