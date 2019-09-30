import React, { Component } from 'react'
import { Label, List, Table, Container, Header } from 'semantic-ui-react'
import { displayStringData } from '../../utils'

const cardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey', pink: "pink"}

class CaseView extends Component {
	 render(){
	 	let report = this.props.report.map((report, idx) =>
	 	(<Table celled striped fluid definition selectable color={cardColors.pink} padded size='large'>
      		<Table.Body>
        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Case</Label>
          			</Table.Cell>
          			<Table.Cell>
	          				<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Status</Header>
	          							<Label size='medium' color={cardColors.pink}>{displayStringData(report.status)}</Label>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Date reported</Header>
	          							<List.Description>{displayStringData(report.reportDate)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Reported by</Header>
	          							<List.Description>{displayStringData(report.reporter)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Relationship to reporter</Header>
	          							<List.Description>{displayStringData(report.reporter_relationship)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Basic info</Label>
          			</Table.Cell>
          			<Table.Cell>
	          				<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Type</Header>
	          							<List.Description>{displayStringData(report.type)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Incident date</Header>
	          							<List.Description>{displayStringData(report.incident_date)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Perpetuator</Header>
	          							<List.Description>{displayStringData(report.perpetuator)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>


        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Bio data</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Age</Header>
	          							<List.Description>{displayStringData(report.age)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Gender</Header>
	          							<List.Description>{displayStringData(report.gender)}</List.Description>
	          						</List.Content>
	          					</List.Item>
								  <List.Item>
	          						<List.Content>
	          							<Header as='h3'>Disability</Header>
	          							<List.Description>{displayStringData(report.disability)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Details/Narrative</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Details</Header>
	          							<List.Description>{displayStringData(report.details)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Location data</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>District</Header>
	          							<List.Description>{displayStringData(report.district) }</List.Description>
	          						</List.Content>
	          					</List.Item>
								  
	          					{/* <List.Item>
	          						<List.Content>
	          							<Header as='h3'>County</Header>
	          							<List.Description>{displayStringData(report.county)}</List.Description>
	          						</List.Content>
	          					</List.Item> */}
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Subcounty</Header>
	          							<List.Description>{displayStringData(report.subcounty)}</List.Description>
	          						</List.Content>
	          					</List.Item>
								  <List.Item>
	          						<List.Content>
	          							<Header as='h3'>Incident location</Header>
	          							<List.Description>{displayStringData(report.location)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					{/* <List.Item>
	          						<List.Content>
	          							<Header as='h3'>Parish</Header>
	          							<List.Description>{displayStringData(report.parish)}</List.Description>
	          						</List.Content>
	          					</List.Item> */}
	          					{/* <List.Item>
	          						<List.Content>
	          							<Header as='h3'>Village</Header>
	          							<List.Description>{displayStringData(report.village)}</List.Description>
	          						</List.Content>
	          					</List.Item> */}
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>Contact info</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>Contact</Header>
	          							<List.Description>{displayStringData(report.contact)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>
      		</Table.Body>
    	</Table>))
	 	return(
	 			<Container>{report}</Container>
	 		)
	 }
}

export default CaseView