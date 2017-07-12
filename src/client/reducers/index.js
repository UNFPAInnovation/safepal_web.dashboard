import { getUserId } from '../utils'
import { REQUEST_LOGIN, 
	SET_AUTH_STATUS, 
	GET_USER,
	SET_USER,
	REQUEST_REPORTS, 
	RECEIVE_REPORTS, 
	REFRESH_REPORTS, 
	REPORTS_ERROR, 
	REQUEST_NOTES, 
	RECEIVE_NOTES, 
	LOGIN_SUCCEEDED,
	ADD_NOTE, 
	SUBMIT_NOTE, 
	NOTE_SUBMITTED, 
	REFRESH_NOTES, 
	NOTES_ERROR, 
	CLEAR_ERROR, 
	SENDING_REQUEST,
	LOADING, 
	GET_TOKEN, 
	CLEAR_NOTES, 
	CLEAR_REPORTS, 
	CLEAR_USER, 
	SET_ADD_NOTE_STATUS } from '../utils/constants'

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

		/*default*/
		default:
		return state
	}
}


const reducer = combineReducers({initialState: rootReducer, pendingTasks: pendingTasksReducer})

export default reducer