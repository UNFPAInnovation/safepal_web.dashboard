import React, { Component } from 'react'
import { Grid, Menu, Label, Header, Container } from 'semantic-ui-react'

import { Spinner } from 'react-redux-spinner' //-- spinner

import Reports from '../../containers/Reports' 
import MyReports from '../../containers/MyReports'
//import Summary from '../../containers/Summary' 

class DashboardView extends Component {
	constructor(props){
    super(props);
    this.state = { activeItem: 'reports'}
    this.handleClick = this.handleClick.bind(this)
} 

handleClick(e, {name}){
	this.setState({
		activeItem: name
	})
}

render(){
	const { activeItem } = this.state
	let data 
    if (activeItem === 'summary') {
      //data = <Summary/>
      //data = (<div>summary</div>)
    }
    else if(activeItem === 'reports'){
    	data = <Reports/>
    }
    else {
      data = <MyReports/>
    }


  return(
  		<Container>
  		<Spinner config={{ trickleSpeed: 200, easing: 'easeInCubic', speed: 1000 }} />
  			<Grid celled doubling>
		      <Grid.Row fluid>
		        <Grid.Column mobile={16} largeScreen={3} widescreen={3} tablet={16}>
		          <Menu fluid vertical pointing>
		            <Menu.Item name='reports' active={activeItem === 'reports'} onClick={this.handleClick}>
		              <Label color='teal'>{this.props.numReports}</Label>
		              <Header as='h4' color='grey'>Reports</Header>
		            </Menu.Item>
		            <Menu.Item name='user_reports' active={activeItem === 'user_reports'} onClick={this.handleClick}>
		              <Label color='teal'>{this.props.numUserReports}</Label>
		              <Header as='h4' color='grey'>My Reports</Header>
		            </Menu.Item>
		          </Menu>
		        </Grid.Column>
		        <Grid.Column mobile={16} largeScreen={13} widescreen={13} tablet={16}>
		          {data}
		        </Grid.Column>
		      </Grid.Row>
		    </Grid>
  		</Container>
  	)
  }
}

export default DashboardView