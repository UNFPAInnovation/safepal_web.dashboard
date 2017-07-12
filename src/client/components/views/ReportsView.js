import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Grid, Menu, Label, Icon, Header, Divider, Item, Table } from 'semantic-ui-react';

import ReportsListView from './ReportsListView';
import SingleReportView from './SingleReportView';
import CaseSearch from '../../containers/CaseSearch';

class ReportsView extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.showReportsByCategory = this.showReportsByCategory.bind(this);
		this.state = {
		status: '',
		viewListMode: true,
		categoryData: []
	};
}

/* reports */
handleClick(e, {name}){
	this.setState({ status: name })
	this.showReportsByCategory(name)
}

showReportsByCategory(category = 'All'){
	switch(category){
		case 'All':
		return this.setState({
			categoryData: this.props.reports
		})

		case 'New':
		return this.setState({
			categoryData: this.props.newReports
		})

		case 'In Progress':
		return this.setState({
			categoryData: this.props.pendingReports
		})

		case 'Closed':
		return this.setState({
			categoryData: this.props.closedReports
		})

		default:
		return this.setState({
			categoryData: this.props.reports
		})
	}
}

render(){
	const { status, categoryData } = this.state;
	const { allCount, newCount, pendingCount, closedCount } = this.props;

	const searchResultsRenderer = ({caseNumber, status, reportDate, location}) => (
		<Table celled striped fluid sortable color='green' padded size='small'>
		<Table.Header>
			<Table.HeaderCell>case Number</Table.HeaderCell>
			<Table.HeaderCell>status</Table.HeaderCell>
			<Table.HeaderCell>reportDate</Table.HeaderCell>
			<Table.HeaderCell>location</Table.HeaderCell>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>
					<Item>
						<Item.Content verticalAlign='middle'>{caseNumber}</Item.Content>
					</Item>
				</Table.Cell>
				<Table.Cell>
					<Item>
						<Item.Content verticalAlign='middle'>{status}</Item.Content>
					</Item>
				</Table.Cell>
				<Table.Cell>
					<Item>
						<Item.Content verticalAlign='middle'>{reportDate}</Item.Content>
					</Item>
				</Table.Cell>
				<Table.Cell>
					<Item>
						<Item.Content verticalAlign='middle'>{location}</Item.Content>
					</Item>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>)

  return(
  	<Grid padded floated='right' stackable doubling width={12}>
  		<Container>
  		<CaseSearch dataSource={categoryData} resultRenderer={searchResultsRenderer}/>
  			<Menu pointing horizontal widths={4}>
  				<Menu.Item name='All' active={status === 'All'} onClick={this.handleClick}>
  					<Label color='teal'>{allCount}</Label>
  					<Header as='h4' color='grey'>All</Header>
  				</Menu.Item>
  				<Menu.Item name='New' active={status === 'New'} onClick={this.handleClick}>
  					<Label color='teal'>{newCount}</Label>
  					<Header as='h4' color='grey'>New</Header>
  				</Menu.Item>
  				<Menu.Item name='In Progress' active={status === 'In Progress'} onClick={this.handleClick}>
  					<Label color='teal'>{pendingCount}</Label>
  					<Header as='h4' color='grey'>In Progress</Header>
  				</Menu.Item>
  				<Menu.Item name='Closed' active={status === 'Closed'} onClick={this.handleClick}>
  					<Label color='teal'>{closedCount}</Label>
  					<Header as='h4' color='grey'>Closed</Header>
  				</Menu.Item>
			</Menu>
		</Container>
	  	<Divider hidden/>
		<Container>
			<ReportsListView data={categoryData} listVersion={status}/>
		</Container>
	</Grid>

  	)
  }
}

export default ReportsView
