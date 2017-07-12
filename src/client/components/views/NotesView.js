import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react'

import NotesListView from './NotesListView'
import CaseActionCardView from './CaseActionCardView'

class NotesView extends Component {
	constructor(props){
		super(props)
		this.state = { notes: this.props.notes }
	}


	render(){

		let {notes} = this.state
		const actionOptions = [
	 		{
	 			text: 'contacted client',
	 			value: 'contacted client'
	 		},
	 		{
	 			text: 'contacted person who reported',
	 			value: 'contacted reporter'
	 		},
	 		{
	 			text: 'met physically with client',
	 			value: 'met client'
	 		},
	 		{
	 			text: 'referred client to other service provider',
	 			value: 'referred client'
	 		},
	 		{
	 			text: 'closed this case',
	 			value: 'closed case'
	 		}
	 	]

		return(
				<Container>
					<NotesListView casenotes={notes}/>
					<Divider hidden/>
					<CaseActionCardView caseNum={this.props.caseNum} options={actionOptions}/>
				</Container>
			)
	}
}

export default NotesView