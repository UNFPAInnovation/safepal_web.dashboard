import React, { Component } from 'react';

import TableListView from './CsoTableListView';

class CsoListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      reports: this.props.data.filter((data) => data.status === this.props.listVersion),
      listVersion: this.props.listVersion
    };
    this.edit = this.edit.bind(this)
  }
  edit(e, id){
    // console.log(id);
    // console.log(e);
   this.props.edit(e, id)
  }

  render(){
    const data  = this.props.data;
  	return(

          <TableListView edit={(e, id)=>this.edit(e, id)} csos={data} />

  		)
  }
}

export default CsoListView
