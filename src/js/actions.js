import fetch from 'isomorphic-fetch';

export const FETCH_DBS            = 'FETCH_DBS';
export const RECEIVE_DBS          = 'RECEIVE_DBS';
export const FETCH_ERROR_DBS      = 'FETCH_ERROR_DBS';
export const GRID_LENGTH_CHANGE   = 'GRID_LENGTH_CHANGE';
export const GRID_PAGE_CHANGE     = 'GRID_PAGE_CHANGE';
export const GRID_PAGE_SET_CHANGE = 'GRID_PAGE_SET_CHANGE';
export const GRID_SELECT_ROW      = 'GRID_SELECT_ROW';
export const GRID_FILTER          = 'GRID_FILTER';
export const GRID_SORT            = 'GRID_SORT';

// DB API
export const DATABASE_API = 'api/databases';

export function receiveDbs (dbs) {
	return {
		type: RECEIVE_DBS,
		dbs
	}
}

export function fetchDBs (params) {
	return dispatch => {
			// dispatch(requestDbs(subreddit))
			return fetch(`${DATABASE_API}`)
				.then(response => response.json())
				.then(json => dispatch(receiveDbs(json)))
	}
}

export function fetchDbsErr (err) {
	return { type: FETCH_ERROR_DBS, err };
} 

export function gridLengthChange (length) {
	return { type: GRID_LENGTH_CHANGE, length };
}

export function gridPageChange (page) {
	return { type: GRID_PAGE_CHANGE, page };
}

export function gridPageSetChange (set) {
	return { type: GRID_PAGE_SET_CHANGE, set};
}

export function gridSelectRow(rowID) {
	return { type: GRID_SELECT_ROW, rowID};
}

export function gridFilter (filterText) {
	return { type: GRID_FILTER, filterText };
}

export function gridSort (sort) {
	return { type: GRID_SORT, sort };
}
