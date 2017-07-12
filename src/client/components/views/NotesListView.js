import React, { Component } from 'react'
import { Table, Header, List, Container, Item } from 'semantic-ui-react'
import { dashboardColors } from '../../utils'

class NotesListView extends Component {
	constructor(props){
		super(props)
	}

	render(){
		let noteRows = (
						<Header as='h3' color={dashboardColors.content} textAlign='center'>No notes have been added yet. Use the form below to add note/comment on case</Header>
					)

		if(this.props.casenotes.length > 0){

			noteRows = this.props.casenotes.map((note, idx) =>
				(<Table.Row key={idx}>
					<Table.Cell collapsing>
            			<List size='large' relaxed horizontal>
            				<List.Item>
            					<List.Content>
            						<List.Description>{note.action_date}</List.Description>
            					</List.Content>
            				</List.Item>
            			</List>
          			</Table.Cell>
          			<Table.Cell collapsing>
            			<List size='large' relaxed horizontal>
            				<List.Item>
            					<List.Content>
            						<Header as='h3'>{note.user}</Header>
            					</List.Content>
            				</List.Item>
            			</List>
          			</Table.Cell>
          			<Table.Cell collapsing>
            			<Item>
					      <Item.Content verticalAlign='middle'>
					        <Item.Description>{note.action}</Item.Description>
					      </Item.Content>
					    </Item>
          			</Table.Cell>
          			<Table.Cell>
	          				<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<List.Description>{note.note}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>)
	 		)
		}

	 	return(
	 			<Container>
	 				<Table celled striped fluid selectable color={dashboardColors.pink} padded size='large' filterable>
	 					<Table.Header>
	 						<Table.Row>
	 							<Table.HeaderCell><Header as='h3'>date</Header></Table.HeaderCell>
	 							<Table.HeaderCell><Header as='h3'>user</Header></Table.HeaderCell>
	 							<Table.HeaderCell><Header as='h3'>action taken</Header></Table.HeaderCell>
	 							<Table.HeaderCell><Header as='h3'>note</Header></Table.HeaderCell>
	 						</Table.Row>
	 					</Table.Header>
	 					<Table.Body>
	 						{noteRows}
	 					</Table.Body>
	 				</Table>
	 			</Container>
	 		)
	 }
}

export default NotesListView
