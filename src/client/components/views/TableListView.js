import React, { Component } from 'react'
import { Item, Table, Grid, Container, Label } from 'semantic-ui-react'
import { forwardTo } from '../../utils'
import Pagination from 'rc-pagination'
import '../../utils/pagination.css'
import locale from '../../utils/locale'


const cardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey', pink: 'pink'}

class TableListView extends Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = { pageSize: 25, rangeStart: 0, rangeEnd: 25, currentPage: 1 }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  onClick(caseNum){
    forwardTo('/dashboard/reports/' + caseNum)
  }

  handlePageChange(page){
    this.setState({
      rangeStart: (page === 1) ? 0 : ((page - 1) * 25) + 1,
      rangeEnd: page * 25,
      currentPage: page
    })
  }
  //to update the synmaic color codes
  renderColorSwitch(status) {
    switch(status) {
      case 'New':
        return 'orange';
      case 'In Progress':
        return 'blue';
      case 'Closed':
        return 'green';
      default:
        return 'gray';
    }
  }

  render(){
    let reports = ''
    const {pageSize, rangeStart, rangeEnd, currentPage } = this.state
    let pagination = ''

    if(this.props.reports !== null && this.props.reports.length > 0){

      pagination = (<Pagination
        total={this.props.reports.length}
        defaultCurrent={1}
        current={currentPage}
        locale={locale}
        pageSize={pageSize}
        onChange={this.handlePageChange}/>)

        let data = this.props.reports;

      //let reports
    let tableData = data.slice(rangeStart, rangeEnd).map((report, idx) => (
          <Table.Row selectable>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'><a href='Javascript:void(0)' onClick={() => this.onClick(report.caseNumber)}>{report.caseNumber}</a></Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>
                      <Label size='medium' color={this.renderColorSwitch(report.status)}  >{report.status}</Label>
                    </Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>{report.reportDate}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>{report.type}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>{report.age}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>{report.gender}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Item>
                    <Item.Content verticalAlign='middle'>{report.location}</Item.Content>
                  </Item>
                </Table.Cell>
            </Table.Row>
      ))

      reports = (<Table celled stackable ={true} striped fluid sortable color={cardColors.pink} padded size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Case Number</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Date reported</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableData}
            </Table.Body>
          </Table>)
    }
  	return(
      
      <Grid doubling>
		      <Grid.Row fluid>
          {reports}
         {pagination}
        </Grid.Row>
        </Grid>
  		)
  }
}

export default TableListView
