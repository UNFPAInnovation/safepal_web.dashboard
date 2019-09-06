/*
* actions: describe application state changes
*/
import {
	SENDING_REQUEST, 
	CLEAR_ERROR, 
	REQUEST_LOGIN, 
	SET_AUTH_STATUS, 
	LOGOUT, 
	GET_USER,
	SET_USER,
	LOADING,
	GET_TOKEN,
	REQUEST_REPORTS, 
	RECEIVE_REPORTS,
	REFRESH_REPORTS,
	REQUEST_NOTES, 
	RECEIVE_NOTES,
	REQUEST_CSOS,
	ADD_NOTE, SET_ADD_NOTE_STATUS} from '../utils/constants'

//-- MISC
/**
 * sets 'sendingRequest' state for requests/actions
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}


/*
* clears error/set error to true/false. True will clear it
*/
export function clearError (hideError) {
	return {type: CLEAR_ERROR, hideError}
}

//-- LOGIN
/**
 * Tells the app we want to log in a user
 * @param  {object} creds          The data we're sending for log in
 * @param  {string} creds.username The username of the user to log in
 * @param  {string} creds.password The password of the user to log in
 */
export function requestLogin (creds) {
	return {type: REQUEST_LOGIN, creds}

}

/**
 * Sets the authentication state of the application
 * @param  {boolean} authState True = user authenticated
 */
export function setAuthState (authState) {
  return {type: SET_AUTH_STATUS, authState}
}

/*export function loginSuccess(localToken){
	return {type: LOGIN_SUCCEEDED, localToken}
}*/

/**
 * Tells the app we want to log out a userREQUEST_LOGIN
 */
export function logout () {
  return {type: LOGOUT}
}

//-- DASHBOARD
/**
* Set currently logged in user
*/
export function setLoggedInUser(user){
  return { type: SET_USER, user}
}

/**
* get currently logged in user
*/
export function getLoggedInUser(){
  return { type: GET_USER }
}

//-- REPORTS/CASES
export function requestReports(cso_id){
	return { type: REQUEST_REPORTS, cso_id }
}

export function receiveReports(reports){
	return {type: RECEIVE_REPORTS, reports}
}

export function refreshReports(reports, userReports){
	return { type: REFRESH_REPORTS, reports, userReports }
}

//-- CASE ACTIVITY

export function getNotes(){
	return { type: REQUEST_NOTES }
}

export function receiveNotes(notes){
	return { type: RECEIVE_NOTES, notes }
}

export function addNote(note){
	return { type: ADD_NOTE, note }
}

export function getToken(userid){
	return { type: GET_TOKEN, userid }
}

export function setAddNoteStatus(notesModalOpen, noteAddedStatus = false){
	return { type: SET_ADD_NOTE_STATUS, notesModalOpen,  noteAddedStatus}
}

//-- MISC
export function isLoading(isLoading){
	return { type: LOADING, isLoading }
}

//-- CSOS/CASES
export function requestCSOs(cso_id){
	return { type: REQUEST_CSOS }
}