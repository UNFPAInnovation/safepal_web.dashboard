import { connect } from 'react-redux'
import SummaryView from '../components/views/SummaryView'

const mapStateToProps = (state) => {
  return {
    numReports: state.reports.length
  }
}

const Summary = connect(mapStateToProps)(SummaryView)
export default Summary
