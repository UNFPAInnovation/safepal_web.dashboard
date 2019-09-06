import { connect } from 'react-redux'
import DashboardView from '../components/views/DashboardView'
import { requestReports } from '../actions'

let getReportsNum = (allReports) => {
	return allReports.length
}

const mapStateToProps = (state) => {
  return {
    numReports: getReportsNum(state.initialState.reports.filter((report) => report.status === 'New')),
    numUserReports: getReportsNum(state.initialState.userReports)
  }
}

const mapDispatchToProps = (dispatch) => {
	return dispatch(requestReports({cso_id: localStorage.SPTCso}))
} 


const Dashboard = connect(mapStateToProps,mapDispatchToProps)(DashboardView)
export default Dashboard
