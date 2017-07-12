import React, { Component } from 'react'
import { Card, Label, Divider, Button, List, Container } from 'semantic-ui-react'
import { forwardTo } from '../../utils'

const cardColors = { label: 'teal', button: 'pink', card: 'teal', icon: 'teal', yellow: 'yellow', content: 'grey'}

class CardListView extends Component {
    constructor(props){
      super(props)
      this.onClick = this.onClick.bind(this)
      this.state = { case: 'none' }
  }

  onClick(casenum){
    this.setState({
      case: casenum
    })
    forwardTo('/dashboard/reports/' + casenum)
  }

  render(){
    let reports = 'No reports for this category'
        const reportData = this.props.reports.map((report, idx) => (
      <Card color={cardColors.card} key={idx} fluid centered onClick={() => this.onClick(report.caseNumber)}>
        <Card.Content>
          <Card.Content extra>
            <Label color={cardColors.label} size='small'>{report.caseNumber}</Label>
            <Button color={cardColors.button} floated='right' size='mini'>{report.status}</Button>
            <Divider hidden/>
          </Card.Content>
          <List size='medium' relaxed horizontal>
            <List.Item>
              <List.Icon name='tag' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>type</List.Header>
                <List.Description>{report.type}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='user' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>gender</List.Header>
                <List.Description>{report.gender}</List.Description>
              </List.Content>
            </List.Item>
          </List>


          <List size='medium' relaxed horizontal>
            <List.Item>
              <List.Icon name='birthday' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>age</List.Header>
                <List.Description>{report.age}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>location</List.Header>
                <List.Description>{report.location}</List.Description>
              </List.Content>
            </List.Item>
          </List>

          <List size='medium' relaxed horizontal>
            <List.Item>
              <List.Icon name='call' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>contact</List.Header>
                <List.Description>{report.contact}</List.Description>
              </List.Content>
            </List.Item>
          </List>

          <List size='medium' relaxed >
            <List.Item>
              <List.Icon name='newspaper' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>Details</List.Header>
                <List.Description>{report.details}</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        
        <Card.Content extra>
          <List size='medium' relaxed horizontal>
           
            <List.Item>
            <List.Icon name='date' color={cardColors.icon} />
              <List.Content color={cardColors.content}>
              <List.Header>when</List.Header>
                <List.Description>{report.reportDate}</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
));

if(this.props.reports.length > 0){
  reports = (<Card.Group itemsPerRow={3} doubling>{reportData}</Card.Group>)
}

    return(
        <Container>
        {reports}
        </Container>
  )
  }
}

export default CardListView