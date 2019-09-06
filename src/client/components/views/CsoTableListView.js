import React, { Component } from 'react'
import { Item, Table, Grid, Container, Label, Button, Icon } from 'semantic-ui-react'
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
    
  }

  handlePageChange(page){
    this.setState({
      rangeStart: (page === 1) ? 0 : ((page - 1) * 25) + 1,
      rangeEnd: page * 25,
      currentPage: page
    })
  }


  render(){
    let csos = ''
    const {pageSize, rangeStart, rangeEnd, currentPage } = this.state
    let pagination = ''

    if(this.props.csos !== null && this.props.csos.length > 0){

      pagination = (<Pagination
        total={this.props.csos.length}
        defaultCurrent={1}
        current={currentPage}
        locale={locale}
        pageSize={pageSize}
        onChange={this.handlePageChange}/>)

        let data = this.props.csos;
    let tableData = data.slice(rangeStart, rangeEnd).map((cso, idx) => (
          <Table.Row selectable>
                
                <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>{cso.cso_name}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>{cso.cso_phone_number}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>{cso.cso_email}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>{cso.cso_location}</Item.Content>
                  </Item>
                </Table.Cell>
                 <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>{cso.cso_working_hours}</Item.Content>
                  </Item>
                </Table.Cell>
                <Table.Cell>
                  <Item>
                    <Item.Content verticalAlign='middle'>
                    <button onClick={(e)=>this.props.edit(e, cso.cso_details_id)} className="ui icon button"><i aria-hidden="true" className="edit left icon"></i></button>
                    </Item.Content>
                  </Item>
                </Table.Cell>
                
                
            </Table.Row>
      ))

      csos = (<Table celled stackable ={true} striped fluid sortable color={cardColors.pink} padded size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone number</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Working Hours</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableData}
            </Table.Body>
          </Table>)
    }
  	return(
      

		      <Grid.Row fluid>
          {csos}
         {pagination}
        </Grid.Row>
       
  		)
  }
}

export default TableListView
