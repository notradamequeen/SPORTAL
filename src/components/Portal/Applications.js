import React, { Component } from 'react'
import Table from './common/table'

class Applications extends Component {
  
  constructor(){
    super()
    this.state = {
      datas: [{
        applicationID: 'AP - 201700005',
        applicantName: 'Caliste Cullen',
        beneficiaries: 1,
        dateSubmitted: '13-12-2017',
        status: 'Received'
      }]
    }
  }

  render() {
    return(
      <React.Fragment>
        <Table dataTable={datas}/>
      </React.Fragment>
    )
  }
}

export default Applications