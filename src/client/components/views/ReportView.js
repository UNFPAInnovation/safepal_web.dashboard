import React, {Component} from 'react'
import { Container, Divider, Grid, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { forwardTo } from '../../utils'

import Header from '../../containers/Header'
import SingleReportView from './SingleReportView'

class ReportView extends Component{
	constructor(props){
		super(props)
		this.goHome = this.goHome.bind(this)
	}
	goHome(){
		forwardTo('/dashboard')
	}
	render(){
		let report = this.props.reports.filter((report) => report.caseNumber === this.props.params.caseNumber)

		return(
				<Container>
					<Divider hidden/>
					<Header/>
					<Divider/>
					<Button as='a' animated='fade' color='teal' fluid type='submit' size='big' onClick={this.goHome} style={{width: '187px'}} icon>
	                	<Button.Content visible><Icon name='angle left'/> Dashboard</Button.Content>
	                	<Button.Content hidden><Icon name='angle left'/> back to dashboard </Button.Content>
	             	</Button>
					<Grid celled doubling>
						<Grid.Row>
							<Grid.Column fluid>
								<SingleReportView report={report}/>
							</Grid.Column>
						</Grid.Row>
					 </Grid>
				</Container>
			)
	}
}

function select (state){
	 return {
    reports: state.initialState.reports
  }
}

export default connect(select)(ReportView)
