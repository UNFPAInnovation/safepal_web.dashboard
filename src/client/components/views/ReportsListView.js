import React, { Component } from 'react';

import TableListView from './TableListView';

class ReportsListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      reports: this.props.data.filter((data) => data.status === this.props.listVersion),
      listVersion: this.props.listVersion
    };
  }

  render(){
    const data  = this.props.data;
  	return(

          <TableListView reports={data} />

  		)
  }
}

export default ReportsListView
