import React, { Component } from 'react'
import { Container, Grid, Image, Label, Menu, Button, Icon } from 'semantic-ui-react'
import Logo from '../../containers/Logo'

class HeaderView extends Component{

	render(){
		return(
				<Container>
					<Grid columns={3} id='header' doubling>
	    				<Grid.Row>
		    				<Grid.Column>
		    					<Image src={Logo} circular style={{width: '60px', height: '60px'}}/>
		    				</Grid.Column>
		    				<Grid.Column>
		    					<Label color='grey' fluid size='big'>SafePal Dashboard</Label>
		    				</Grid.Column>
		    				<Grid.Column>
		    					<Menu secondary>
							        <Menu.Menu position='right'>
							          <Menu.Item>
							            <Label size='medium' color='teal'>
							              <Icon name='user' circular/> {this.props.username}
							            </Label>
							          </Menu.Item>
							          <Menu.Item>
							            <Button as='a' animated='fade' color='teal' fluid type='submit' size='small' onClick={this.props.onLogOut}>
							              <Button.Content visible>logout </Button.Content>
							              <Button.Content hidden>logout </Button.Content>
							            </Button>
							          </Menu.Item>
							        </Menu.Menu>
						      </Menu>
		    				</Grid.Column>
	    				</Grid.Row>
	    			</Grid>
				</Container>
			)
	}
}

export default HeaderView