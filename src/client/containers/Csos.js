import { connect } from 'react-redux'
import { requestCSOs } from '../actions'
import CsoView from '../components/views/CsoView'



const mapStateToProps = (state) => {
  return {
    csos: requestCSOs()
  }
}

const mapDispatchToProps = (dispatch) => {
	return{
		addCSo: () => {
			console.log("Add CSo")
		}
	}
}

const Csos = connect(mapStateToProps, mapDispatchToProps)(CsoView)
export default Csos