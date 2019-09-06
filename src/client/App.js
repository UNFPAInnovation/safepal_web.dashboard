//-- libs
import 'babel-polyfill'
import React, { Component } from 'react'
import { browserHistory, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

//--redux-saga
import { clearError } from './actions'
import reducer from './reducers'
import saga from './sagas'

//--components
import NotFound from './components/NotFound'
import HomeView from './components/views/HomeView'
import ReportView from './components/views/ReportView'

//-- containers
import Login from './containers/Login'

//-- store setup
let sagasMiddleware = createSagaMiddleware()
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(sagasMiddleware))

//--init sagas
sagasMiddleware.run(saga) //auto-run middleware

//-- setup OnEnter route checks
//check if user is logged in for any given route
//-- pass desired login state (next state) & use react router replace function to handle nav to required path/route
function checkAuthOnRoute(nextState, replace){
	let { loggedIn, authorize } = store.getState()

	store.dispatch(clearError(true)) //error

	  // Check if the path isn't dashboard. That way we can apply specific logic to, 
  // display/render the path we want to

	if (nextState.location.pathname !== '/dashboard') {
		if (authorize && loggedIn) {
			if (nextState.location.state && nextState.location.pathname) {
				replace(nextState.location.pathname)
			} else {
				replace('/')
			}

		}
	} else {
		if (!authorize && loggedIn === false) {
			if (nextState.location.state && nextState.location.pathname) {
				replace(nextState.location.pathname)
			} else {
				replace('/')
			}
		}
	}
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          	<Route path='/' component={Login}/>
         <Route onEnter={checkAuthOnRoute}>
	        <Route path='/dashboard' component={HomeView} />
	        <Route path='/dashboard/reports/:caseNumber' component={ReportView} />
	        <Route path='*' component={NotFound} />
	     </Route>
        </Router>
      </Provider>
    )
  }
}


export default App
