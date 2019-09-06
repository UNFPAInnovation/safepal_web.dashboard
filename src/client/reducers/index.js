import { getUserId } from '../utils'
import { SET_AUTH_STATUS,
	SET_USER, 
	RECEIVE_REPORTS, 
	REFRESH_REPORTS,
	RECEIVE_NOTES,
	ADD_NOTE, 
	CLEAR_ERROR, 
	SENDING_REQUEST,
	LOADING, 
	GET_TOKEN, 
	CLEAR_NOTES, 
	CLEAR_REPORTS, 
	CLEAR_USER, 
	SET_ADD_NOTE_STATUS, REQUEST_CSOS } from '../utils/constants'

import { combineReducers } from 'redux'
//-- spinner
import { pendingTasksReducer } from 'react-redux-spinner';

//-- initial state
let init = {
	/*auth*/
	loggedInUser: null,
	loggedIn: false,
	authorize: true,
	userid: getUserId(), //--TO-DO: refactor

	/*reports*/	
	reports: [],
	userReports: [],

	/*notes*/
	notes: [],

	/*misc*/
	csos:[],
	errorHidden: true,
	pendingTasks: 0,
	currentlySending: false,
	isLoading: false,
	elementEnabled: true,
	notesModalOpen: false,
	noteAddedStatus: false
}

function rootReducer (state = init, action) {
	switch(action.type){
		/*auth*/
		case SET_AUTH_STATUS:
			return {...state, loggedIn: action.authState}
		case SET_USER:
			return Object.assign({}, state, {
					loggedInUser: action.user
				})
		case CLEAR_USER:
			return {...state, userid: null}


		/*reports*/
		case REFRESH_REPORTS:
		case RECEIVE_REPORTS:
			return {...state, reports: action.reports, userReports: action.userReports }
		case CLEAR_REPORTS:
			return {...state, reports: [], userReports: []} 


		/*notes*/
		case RECEIVE_NOTES:
			return {...state, notes: action.notes }
		case ADD_NOTE:
			return {...state, newNote: action.note }
		case CLEAR_NOTES:
			return {...state, notes: []} 
		case SET_ADD_NOTE_STATUS:
			return {...state, noteAddedStatus: action.noteAddedStatus, notesModalOpen: action.notesModalOpen} 


		/*misc*/
		case CLEAR_ERROR:
			return {...state, errorHidden: action.hideError}
		case SENDING_REQUEST:
			return {...state, currentlySending: action.sending}
		case GET_TOKEN:
			return {...state, userid: action.userid}
		case LOADING:
			return {...state, isLoading: action.isLoading}
		
		/*csos*/
		case REQUEST_CSOS:
			return {...state, csos: action.csos }

		/*default*/
		default:
		return state
	}
}
false

const reducer = combineReducers({initialState: rootReducer, pendingTasks: pendingTasksReducer})

export default reducer