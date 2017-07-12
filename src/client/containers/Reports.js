import { connect } from 'react-redux'
import ReportsView from '../components/views/ReportsView'


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
    reports: state.initialState.reports,
    newReports: getNewReports(state.initialState.reports),
    pendingReports: getPendingReports(state.initialState.reports),
    closedReports: getClosedReports(state.initialState.reports),
    allCount: state.initialState.reports.length,
    newCount: getNewReports(state.initialState.reports).length,
    pendingCount: getPendingReports(state.initialState.reports).length,
    closedCount: getClosedReports(state.initialState.reports).length
  }
}


const Reports = connect(mapStateToProps)(ReportsView)
export default Reports
