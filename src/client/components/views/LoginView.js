import React, {Component} from 'react'
import { Header, Image, Form, Input, Button, Grid, Divider, Message, Container } from 'semantic-ui-react'
import Logo from '../../containers/Logo'

import { Spinner } from 'react-redux-spinner' //-- spinner

class LoginView extends Component{
	constructor(){
		super();
		this.handleEmailInputChange = this.handleEmailInputChange.bind(this)
    	this.handlePassInputChange = this.handlePassInputChange.bind(this)
    	this.state = { user: null, pass: null }
	}

	handleEmailInputChange(e){
		this.setState({
	  	user: e.target.value
	  })
	}

	handlePassInputChange(e){
	  this.setState({
	  	pass: e.target.value
	  })
	}

	render(){
		return(
			<Container>
				<Spinner config={{ trickleSpeed: 200, easing: 'easeInCubic', speed: 1000 }} />
				<Divider hidden/>
		  			<Image src={Logo} size='small' shape='circular' centered/>
		  			<Header as='h2' color='teal' textAlign='center'> CSO Dashboard </Header>
	  			<Divider hidden/>

	  			<Grid columns={3} relaxed verticalAlign='bottom'>
		  			<Grid.Row>
	    				<Grid.Column> 
	    				</Grid.Column>

	    				<Grid.Column>
	              			<Message error header='Incorrect login' content='Check and re-enter your username and password' color='red' hidden={this.props.errorHidden}/>
	    					<Form widths='equal'>
			      			 	<Form.Field required>
	                  				<label>username (email address)</label>
					  				<Input type='email' placeholder='email' size='big' onChange={(e) => this.handleEmailInputChange(e)}/>
								</Form.Field>
								<Form.Field required>
	                  				<label>your password</label>
					  				<Input type='password' placeholder='password' size='big' onChange={(e) => this.handlePassInputChange(e)}/>
								</Form.Field>

	                 			<Divider hidden/>

	                  			<Button as='a' animated='fade' color='pink' fluid type='submit' size='big' onClick={() => this.props.onLoginClick({username: this.state.user, password: this.state.pass, userid: this.props.userid})} active={this.props.isLoading}>
	                    			<Button.Content visible>Log In </Button.Content>
	                    			<Button.Content hidden> click to login </Button.Content>
	                  			</Button>
	      					</Form>
	    				</Grid.Column>

	    				<Grid.Column>
	    				</Grid.Column>
	    			</Grid.Row>
    			</Grid>
			</Container>
		)
	}
}

export default LoginView
