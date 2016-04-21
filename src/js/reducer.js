import { combineReducers } from 'redux';
import { 
	RECEIVE_DBS, 
	GRID_LENGTH_CHANGE,
	GRID_PAGE_CHANGE,
	GRID_PAGE_SET_CHANGE,
	GRID_SELECT_ROW
} from './actions';

export const databases = (state = window.INITIAL_STATE.databases, action) => {
  switch (action.type) {
	case RECEIVE_DBS:
		return [...action.dbs];
  default:
    return state;
  }
};

export const grid = (state = window.INITIAL_STATE.grid, action) => {
  switch (action.type) {
	case RECEIVE_DBS:
		return {...state, items: [...action.dbs]};
	case GRID_LENGTH_CHANGE:
		if (action.length === 'All') {
			return {...state, selectedPage: 1, selectedLength: state.items.length, selectedPageSet: 1, selectedItems: {}};
		} else {
			return {...state, selectedPage: 1, selectedLength: action.length, selectedPageSet: 1, selectedItems: {}};
		}
	case GRID_PAGE_CHANGE:
		const setEnd   = state.selectedSet * state.setLength;
		const setStart = (state.selectedSet - 1) * state.setLength + 1;

		if (action.page < setStart) {
			return {...state, selectedPage: action.page, selectedSet: state.selectedSet - 1, selectedItems: {}};	
		} else if (action.page > setEnd) {
			return {...state, selectedPage: action.page, selectedSet: state.selectedSet + 1, selectedItems: {}};	
		} else {
			return {...state, selectedPage: action.page};	
		}	
	case GRID_PAGE_SET_CHANGE:
		const pages = Math.ceil(state.items.length / state.selectedLength);
		const sets  = Math.ceil(pages / state.setLength);

		if (action.set >= 1 && action.set <= sets) {
			return { ...state, selectedSet: action.set, selectedPage: ((action.set - 1) * state.setLength + 1), selectedItems: {} };
		}
	case GRID_SELECT_ROW:
		const rowID = action.rowID;
		const newItems = {...state.selectedItems};
		
		// If row previously selected, toggle it
		if (newItems[rowID]) {
			delete newItems[rowID];	
		} else {
			for (let i = 0; i < state.items.length; i++) {
				if (state.items[i].id === rowID) {
					newItems[rowID]	= state.items[i];
					break;
				}	
			}	
		}

		return {...state, selectedItems: newItems};
  default:
    return state;
  }
};

export const appReducer = combineReducers({
  databases,
	grid
});
