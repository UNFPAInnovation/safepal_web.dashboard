import React, { Component } from 'react';
import { Container, Grid, Menu, Label, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CaseView from './CaseView';
import NotesView from './NotesView';

class SingleReportView extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = { menuSection: 'case', currentCase: null};
	}

	handleClick(e, {name}){
		this.setState({ menuSection: name });
	}

	componentWillMount(){
		this.setState({
			currentCase: this.props.report.map((report) => report.caseNumber)
		})
	}


	render(){
		let { report } = this.props;
		let { menuSection, currentCase } = this.state;
		let caseNotes = [];
		if(this.props.notes.length > 0){
			caseNotes = this.props.notes.filter((note) => note.caseNumber === currentCase[0])
		}

		let dataView
		if (menuSection === 'case') {
			dataView = (<Container><CaseView report={report} /></Container>)
		}

		else{
			dataView = <NotesView notes={caseNotes} caseNum={currentCase}/>
		}

		return (
				<Container>
				<Menu pointing horizontal stackable widths={2}>
					<Menu.Item name='case' active={menuSection === 'case'} onClick={this.handleClick}>
					<Label color='pink'>CASE</Label>
					<Header as='h4' color='grey'>{report.map((report) => report.caseNumber)} </Header>
					 </Menu.Item>
				<Menu.Item name='notes' active={menuSection === 'notes'} onClick={this.handleClick}>
					<Label color='pink'>{caseNotes.length}</Label>
					<Header as='h4' color='grey'>Notes</Header>
					</Menu.Item>
				</Menu>
				<Grid fluid padded stackable>
					{dataView}
				</Grid>
				</Container>
			)
	}
}

function selectNotes (state){
	 return {
    notes: state.initialState.notes
  }
}

export default connect(selectNotes)(SingleReportView)
