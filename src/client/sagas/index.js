import { take, call, put, fork, race } from 'redux-saga/effects'
import {hashSync, genSaltSync, compareSync} from 'bcryptjs'
import localStorage from 'localStorage' //-todo: consider switching to LocalForage - has callbacks/promises


import {
  REQUEST_LOGIN,
  SET_AUTH_STATUS,
  GET_USER,
  SET_USER,
  SENDING_REQUEST,
  LOADING,
  LOGIN_SUCCEEDED,
  CLEAR_ERROR,
  GET_TOKEN,
  LOGOUT,
  REQUEST_REPORTS,
  RECEIVE_REPORTS,
  REQUEST_NOTES,
  RECEIVE_NOTES,
  ADD_NOTE,
  CLEAR_NOTES,
  CLEAR_REPORTS,
  CLEAR_USER,
  SET_ADD_NOTE_STATUS } from '../utils/constants'

import api  from '../../server/api'
import genSalt from '../../server/api/salt'
import { forwardTo, generateLocalToken } from '../utils'

//-- spinner
import { pendingTask, begin, end } from 'react-redux-spinner';

let token
let salt = genSaltSync(10)


//-- WATCHERS/SAGAS
/*
* LOGIN SAGA
*/
export function* loginSaga(){
  //keep saga running always
  while(true){
    //listen for 'REQUEST_LOGIN' action
    let request = yield take(REQUEST_LOGIN)
    let {username, password} = request.creds

    yield put({type: LOADING,[ pendingTask ]: begin,isLoading: true})

    // A `LOGOUT` action may happen while the `authentication` effect is going on, call `race` which
    // returns the "winner" - action which finished first
    let winner = yield race({
      login: call(authentication, {username, password, isRegistering: false}),
      logout: take(LOGOUT)
    })

    // If `authentication`/`login` finished first
    if (winner.login) {
      //generate salt
      let userSalt = genSalt(username)
      let tokenHash = hashSync(generateLocalToken(), userSalt) //check for this token

      try{

        if (localStorage.SPT=== undefined && !localStorage.encrypted) {
          let SPT = {
            token: hashSync(tokenHash, salt)
          }

          localStorage.SPT = JSON.stringify(SPT)
          localStorage.encrypted = true
        }

        yield put({type: SET_AUTH_STATUS, authState: true})
        yield put({type: SET_USER, user: username})
        yield put({type: LOADING,[ pendingTask ]: end, isLoading: false})
        forwardTo('/dashboard')

      }catch(error){
        window.alert('Oops, something went wrong.')
      }finally{
         yield put({type: SENDING_REQUEST, sending: false})
      }
    } else{
        yield put({type: SET_AUTH_STATUS, authState: false})
        yield put({type: LOADING,[ pendingTask ]: end, isLoading: false})
        yield put({type: CLEAR_ERROR, hideError: false})
    }
  }
}

/*
* - get/refresh reports
*/
export function* reportsSaga(){
  while(true){
    let req = yield take(REQUEST_REPORTS)
    let { cso_id }  = req.cso_id

    yield put({type: LOADING,[ pendingTask ]: begin, isLoading: false})
    token = yield call(getToken)
    if (token !== undefined) {
      let reports = yield call(getAllReports, token, cso_id)

      if (reports !== undefined) {
        yield put({type: RECEIVE_REPORTS, reports: reports.reports, userReports: reports.user_reports})
        yield put({type: SET_USER, user: localStorage.SPTUser}) //issue with state on refresh, try to get user from storage
        yield put({type: SET_AUTH_STATUS, authState: true})

        try{
          yield put({type: REQUEST_NOTES})  //try to get notes
        } catch(error){
          window.alert('Oops, something went wrong.')
        }
      }
    }
    yield put({type: LOADING,[ pendingTask ]: end, isLoading: false}) //end reports task

    yield put({type: SENDING_REQUEST, sending: false})
  }
}


/*
* - get/refresh notes
*/
export function* notesSaga(){
  while(true){
    yield take(REQUEST_NOTES)
    yield put({type: LOADING,[ pendingTask ]: begin, isLoading: false})
    token = yield call(getToken)
    if (token !== undefined) {
      let notes = yield call(getAllNotes, token)

      if (notes !== undefined) {
        yield put({type: RECEIVE_NOTES, notes: notes})
      }
    }
    yield put({type: LOADING,[ pendingTask ]: end, isLoading: false}) //end notes task
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

/*
* - add notes
*/
export function* addNoteSaga(){
  while(true){
    let firedAction = yield take(ADD_NOTE)
    yield put({type: SENDING_REQUEST, sending: true})
    yield put({type: LOADING,[ pendingTask ]: begin, isLoading: true})
    let note = {} //create empty object
    note = {action: firedAction.note.action, user: firedAction.note.user, caseNumber: firedAction.note.caseNumber, note: firedAction.note.note, action_date: firedAction.note.action_date}
    token = yield call(getToken)
    if (token !== undefined) {
      let status = yield call(addNote, token, note)
      if (status === 'success') {
        yield put(REQUEST_NOTES) //refresh notes
        yield put({type: SET_ADD_NOTE_STATUS, noteAddedStatus: true, notesModalOpen: true})
      }else{
        yield put({type: SET_ADD_NOTE_STATUS, noteAddedStatus: false, notesModalOpen: true})
      }
    }
    yield put({type: SENDING_REQUEST, sending: false})
    yield put({type: LOADING,[ pendingTask ]: end, isLoading: false})
  }
}

/*
* LOGOUT SAGA
*/
export function* logoutSaga(){
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH_STATUS, authState: false})
    yield call(logout)
    forwardTo('/')
  }
}


//-- EFFECTS/WORKERS

/*
* get token EFFECT
*/
export function* getToken(){
  yield put({type: SENDING_REQUEST, sending: true})
  let response = yield call(api.getToken)
  token = response.data.token

  if (token !== undefined) {
    return token
  }else{
    return token = undefined
  }
}

/*
* REPORTS EFFECT
*/
export function* getAllReports(token, cso_id){
  let response = yield call(api.getReports, token, cso_id)
  return response.data
}

/*
* NOTES EFFECT
*/
export function* getAllNotes(token){
  let response = yield call(api.getNotes, token)
  return response.data.notes
}

/*
* ADD NOTES EFFECT
*/
export function* addNote(token, note){
  let response = yield call(api.addNote, token, JSON.stringify(note))
  return response.data.status
}

/**
 * Effect to handle auth
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authentication ({username, password, isRegistering}) {
  // tell Redux we're in the middle of sending a request
  yield put({type: SENDING_REQUEST, sending: true})

  let loginStatus = null
  token = yield call(getToken)

  //generate hash
  let pSalt = genSalt(password)
  let pHash = hashSync(generateLocalToken(), pSalt)
  password = pHash  //switch out for hash

 if (token !== undefined) {
    //try to log in the user with credentials
    try{
      loginStatus = yield call(api.login, username, password, token)
      if (loginStatus.data.status === 'success') {
        //log user info
        localStorage.SPTUserId = loginStatus.data.user.userid
        localStorage.SPTCso = loginStatus.data.user.cso_id
        localStorage.encrypted = true
        return true
      }
      yield put({type: CLEAR_ERROR, hideError: false})
      return false
    }catch(error){
      return error
    }finally{
      yield put({type: SENDING_REQUEST, sending: false})
    }
  }
}


/*
* log out effect
*/
export function* logout(){
    //yield put({type: SENDING_REQUEST, sending: true})
    let response = yield call(removeToken)
    yield put({type: CLEAR_REPORTS})
    yield put({type: CLEAR_NOTES})
    yield put({type: CLEAR_USER})
    yield put({type: SENDING_REQUEST, sending: false})
    return response
}

//-- fork
export default function* saga(){
  yield fork(loginSaga)
  yield fork(logoutSaga)
  yield fork(reportsSaga)
  yield fork(notesSaga)
  yield fork(addNoteSaga)
}

function removeToken(){
  return new Promise(resolve => {
    localStorage.removeItem('SPT')
    localStorage.removeItem('SPTUser')
    localStorage.removeItem('SPTUserId')
    localStorage.removeItem('SPTCso')
    resolve(true)
  })
}
