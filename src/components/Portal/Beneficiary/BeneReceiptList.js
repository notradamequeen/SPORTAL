import React, { Component } from 'react'

class BeneReceiptList extends Component{
  render(){
    const { ReceiptList } = this.props
    console.log(ReceiptList)
    return(
      <div className="panel">
        <div className="panel-heading">
          <h4 className="title">
            Receipts
          </h4>
        </div>
        <div className="panel-body">
          <ul className="list-unstyled team-members">
            {ReceiptList.map(Receipt => {
              return (
                <li>
                  <div className="row">
                    <div className="col-xs-6">
                      {Receipt.Name} <br/>
                    <span className="text-muted">
                      <small>{Receipt.Approved_Amount__c}</small>
                    </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default BeneReceiptList