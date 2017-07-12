import React, {Component} from 'react'
import { Container, Divider } from 'semantic-ui-react'

import Header from '../../containers/Header' 
import Dashboard from '../../containers/Dashboard' 

class HomeView extends Component{
	render(){
		return(
				<Container>
					<Divider hidden/>
					<Header/>
					<Divider/>
					<Dashboard/>
				</Container>
			)
	}
}

export default HomeView