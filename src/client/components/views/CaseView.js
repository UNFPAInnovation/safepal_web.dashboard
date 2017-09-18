import React, { Component } from 'react'
import { Label, List, Table, Container, Header } from 'semantic-ui-react'
import { displayStringData, castSelfReportsToSurvivor } from '../../utils'

const cardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey', pink: "pink"}

class CaseView extends Component {
	 render(){
	 	let report = this.props.report.map((report, idx) =>
	 	(<Table celled striped fluid definition selectable color={cardColors.pink} padded size='large'>
      		<Table.Body>
        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>case</Label>
          			</Table.Cell>
          			<Table.Cell>
	          				<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>status</Header>
	          							<Label size='medium' color={cardColors.pink}>{displayStringData(report.status)}</Label>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>date reported</Header>
	          							<List.Description>{displayStringData(report.reportDate)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>reported by</Header>
	          							<List.Description>{castSelfReportsToSurvivor(report.reporter)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>basic info</Label>
          			</Table.Cell>
          			<Table.Cell>
	          				<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>type</Header>
	          							<List.Description>{displayStringData(report.type)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>incident date</Header>
	          							<List.Description>{displayStringData(report.incident_date)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>where incident happened</Header>
	          							<List.Description>{displayStringData(report.location)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>perpetuator</Header>
	          							<List.Description>{displayStringData(report.perpetuator)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>


        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>bio data</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>age</Header>
	          							<List.Description>{displayStringData(report.age)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>gender</Header>
	          							<List.Description>{displayStringData(report.gender)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>details/narrative</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>details</Header>
	          							<List.Description>{displayStringData(report.details)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>reporter location</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>district</Header>
	          							<List.Description>{displayStringData(report.district) }</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>county</Header>
	          							<List.Description>{displayStringData(report.county)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>subcounty</Header>
	          							<List.Description>{displayStringData(report.subcounty)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>parish</Header>
	          							<List.Description>{displayStringData(report.parish)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>village</Header>
	          							<List.Description>{displayStringData(report.village)}</List.Description>
	          						</List.Content>
	          					</List.Item>
	          				</List>
          			</Table.Cell>
        		</Table.Row>

        		<Table.Row>
          			<Table.Cell collapsing>
            			<Label size='huge'>contact info</Label>
          			</Table.Cell>
          			<Table.Cell>
          					<List size='large' relaxed horizontal>
	          					<List.Item>
	          						<List.Content>
	          							<Header as='h3'>contact</Header>
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