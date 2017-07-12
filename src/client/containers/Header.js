import { connect } from 'react-redux'
import { logout } from '../actions'
import HeaderView from '../components/views/HeaderView'
import { getUser } from '../utils'


const mapStateToProps = (state) => {
  return {
    username: getUser() || state.initialState.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLogOut: () => {
			dispatch(logout())
		}
	}
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView)
export default Header