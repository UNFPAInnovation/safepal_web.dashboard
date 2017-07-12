import React, { Component } from 'react'
import { TextArea, Dropdown, Button, Form, Container, Divider, Modal, Confirm, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addNote,setAddNoteStatus  } from '../../actions'
import { forwardTo } from '../../utils'
import { Spinner } from 'react-redux-spinner' //-- spinner

const cardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey', pink: "pink"}

class CaseActionCardView extends Component {
	constructor(props){
		super(props)
		this.state = { actionTaken: null, 
			comment: null, 
			caseNum: this.props.caseNum, 
			modalOpen: this.props.modalOpen, 
			notesModalOpen: this.props.notesModalOpen, 
			confirmOpen: false, 
			noteAddedStatus: this.props.noteAddedStatus }
		this.getActionValue = this.getActionValue.bind(this)
		this.getCommentValue = this.getCommentValue.bind(this)
		this.validateForm = this.validateForm.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleStatusModalClose = this.handleStatusModalClose.bind(this)
		this.onRefresh = this.onRefresh.bind(this)
	}

	//--TO-DO: Refactor here
	getActionValue(e, data){
		this.setState({
			actionTaken: data.value
		})
	}

	getCommentValue(e, data){
		this.setState({
			comment: data.value
		})
	}

	validateForm(){
		if (this.state.actionTaken === null || this.state.comment === null) {
			this.setState({
				modalOpen:true
			})
		} else{
			this.setState({
				confirmOpen: true
			})
		}
	}

	handleClose() {
		this.setState({
			modalOpen: false, 
			confirmOpen: false,
			notesModalOpen: false
		})
		if(this.props.noteAddedStatus){
			this.setState({
				notesModalOpen: false
			})
			forwardTo('/dashboard')
		}
	}

	handleStatusModalClose(){
		this.props.dispatch(setAddNoteStatus(false, false))
		if(this.props.noteAddedStatus){
			//load case again
			forwardTo('/dashboard')
		}
	}

	onRefresh(){
		forwardTo('/dashboard/reports/' + this.state.caseNum)
	}

	onConfirm(){
		this.handleClose()
		let actionDate = new Date()
		actionDate = actionDate.getFullYear() + '-' + ("0" + (actionDate.getMonth() + 1)).slice(-2) + '-' + ("0" + actionDate.getDate()).slice(-2)
		let data = {} //create empty object
		data = {action: this.state.actionTaken, note: this.state.comment, user: this.props.user, caseNumber: this.state.caseNum[0], action_date: actionDate}
		this.props.dispatch(addNote(data))
	}

	 render(){
	 	let { noteAddedStatus, notesModalOpen } = this.props

	 	let modalMessage

	 	if (noteAddedStatus) {
	 		modalMessage = 'Note added successfully'
	 	}
	 	else{
	 		modalMessage = 'Failed to add your note to case mumber ' + this.state.caseNum
	 	}

	 	let notesStatusModal = (<Modal open={notesModalOpen} onClose={this.handleStatusModalClose} basic size='small'>
						<Header content='Case Activity status' />
						<Modal.Content> {modalMessage} </Modal.Content>
						<Modal.Actions>
							<Button color='teal' onClick={this.handleStatusModalClose}>
								<Icon name='checkmark' /> OK
							</Button>
						</Modal.Actions>
					</Modal>)
	 	return(
	 			<Container>
	 			<Spinner config={{ trickleSpeed: 200, easing: 'easeInCubic', speed: 1000 }} />
		 			<Modal open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
						<Header content='Invalid input' />
						<Modal.Content> To submit a note, you MUST select an action and also add a comment </Modal.Content>
						<Modal.Actions>
							<Button color='teal' onClick={this.handleClose}>
								<Icon name='checkmark' /> OK
							</Button>
						</Modal.Actions>
					</Modal>
					{notesStatusModal}
					<Confirm 
						open={this.state.confirmOpen} 
						onCancel={this.handleClose} 
						onConfirm={this.onConfirm}
						content="Are you sure you want to submit this note?"/>
	 				<Form widths='equal'>
		      			<Form.Field required>
		      				<Dropdown placeholder='Select Action' floating button scrolling selection options={this.props.options} onChange={(e, data) => this.getActionValue(e, data)} />
		      			</Form.Field>
						<Form.Field required>
				  			  <TextArea placeholder='add your note/comment here' onChange={(e, data) => this.getCommentValue(e, data)}/>
						</Form.Field>
                 		<Divider hidden/>
                  		<Button as='a' 
                  			animated='fade' 
                  			color='pink' 
                  			fluid type='submit' size='big' 
                  			onClick={this.validateForm}
                  			style={{width: '50%', margin: 'auto'}}>
                    		<Button.Content visible>Save Note/Comment</Button.Content>
                    		<Button.Content hidden> click to save your note/comment</Button.Content>
                  		</Button>
      				</Form>
	 			</Container>
	 		)
	 }
}

function select (state){
	 return {
    user: state.initialState.loggedInUser,
    noteAddedStatus: state.initialState.noteAddedStatus,
    notesModalOpen: state.initialState.notesModalOpen
  }
}

export default connect(select)(CaseActionCardView)