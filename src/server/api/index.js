import axios from 'axios'
import localStorage from 'localStorage'

let baseURL = ''
let userid = ''

let api = {
	getToken(){
		return getRequest('/auth/newtoken')
	},
	login(username, password, token){
		let payload = {username: username, hash: password, token: token }
		return postRequest('/auth/login', payload)
	},
	getReports(token, cso_id){
		userid = localStorage.SPTUserId
		let payload = {token: token, cso_id: cso_id}
		return postRequest('/reports/all', payload)
	},
	getNotes(token){
		userid = localStorage.SPTUserId
		let payload = {token: token}
		return postRequest('/activity/all', payload)
	},
	addNote(token, note){
		userid = localStorage.SPTUserId
		let notes = JSON.parse(note)
		let payload = {token: token, note: notes.note, user: notes.user, caseNumber: notes.caseNumber, action: notes.action, action_date: notes.action_date}
		return postRequest('/activity/addactivity', payload)
	}
}


//- handle get requests
function getRequest(endpoint, token = false){
	return axios({
		method: 'get',
		url: baseURL + endpoint,
		headers: {'userid' : userid}
	}).then(response => {
		return {
			data: response.data
		}
	})
}

//- handle post requests
function postRequest(endpoint, payload){

	let actionDate = new Date()
	let data = {
		"token": payload.token
	}
	switch(endpoint){
		case '/auth/login':
		data.username = payload.username,
		data.hash = payload.hash
		case '/activity/addactivity':
		data.note = payload.note,
		data.user = payload.user,
		data.caseNumber = payload.caseNumber,
		data.action = payload.action,
		data.action_date = payload.action_date
		case '/reports/all':
		data.cso_id = payload.cso_id
		default:
		data = payload
	}

	
	return axios({
		method: 'post',
		url: baseURL + endpoint,
		headers: {'userid' : userid},
		data: data
	}).then(response => {
		return {
			data : response.data
		}
	}) 
}

export default api