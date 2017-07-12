import { connect } from 'react-redux'
import { requestLogin } from '../actions'
import LoginView from '../components/views/LoginView'
import localStorage from 'localStorage'

const mapStateToProps = (state) => {
	return{
		errorHidden: state.initialState.errorHidden,
		loggedIn: state.initialState.loggedIn,
		userid: state.initialState.userid,
		isLoading: state.initialState.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onLoginClick: (creds) => {
			localStorage.SPTUser = creds.username //- work-around async nature of localStorage -- set username on click
			dispatch(requestLogin(creds))
		}
	}
}

const Login = connect(mapStateToProps,mapDispatchToProps)(LoginView)

export default Login