import { browserHistory } from 'react-router'
import localStorage from 'localStorage'


let utils = {
	checkIfCanJsonParse(object){ //--TO-DO: refactor
		try{
			JSON.parse(object)
		}catch(error){
			return false
		}

		return true
	},
	checkLocalTokenExists(){
		if (localStorage.SPTUser === undefined) {
			return false
		}

		return true
	},
	checkLocalUserIdExists(){
		if (localStorage.SPTUserId === undefined) {
			return false
		}

		return true
	},
}

export const displayStringData = (data) => (data === '' || data === undefined || data === null || data === 'null' || data === 'Unknown') ? '--' : data

export const castSelfReportsToSurvivor = (data) => (data === 'self' || data === 'self_report') ? 'survivor' : data

export const forwardTo = (location) => browserHistory.push(location)

export const generateLocalToken = () => Math.random().toString(36).substring(2)

export const getUserId = () => {
	if(utils.checkIfCanJsonParse(localStorage) && utils.checkLocalUserIdExists()){
		return localStorage.SPTUserId
	}
	return undefined
}

export const getUser = () => {
	if(utils.checkIfCanJsonParse(localStorage) && utils.checkLocalTokenExists()){
		return localStorage.SPTUser
	}
	return undefined
}

export const dashboardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey', pink: "pink"}

export default utils