import { connect } from 'react-redux'
import MyReportsView from '../components/views/MyReportsView'


let getNewReports = (reports) => {
	return reports.filter((report) => report.status === 'New')
}

let getPendingReports = (reports) => {
	return reports.filter((report) => report.status === 'In Progress')
}

let getClosedReports = (reports) => {
	return reports.filter((report) => report.status === 'Closed')
}

const mapStateToProps = (state) => {
  return {
    //user reports
    userReports: state.initialState.userReports,
    newUserReports: getNewReports(state.initialState.userReports),
    userPendingReports: getPendingReports(state.initialState.userReports),
    userClosedReports: getClosedReports(state.initialState.userReports),
    userAllCount: state.initialState.userReports.length,
    userNewCount: getNewReports(state.initialState.userReports).length,
    userPendingCount: getPendingReports(state.initialState.userReports).length,
    userClosedCount: getClosedReports(state.initialState.userReports).length
  }
}

const MyReports = connect(mapStateToProps)(MyReportsView)
export default MyReports