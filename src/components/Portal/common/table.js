import React, { Component } from 'react'

class Table extends Component {

  // kolom nya bisa di props, bentuknya array
  // kalo ga ada, dia bakal pake nama property dari objek nya
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      properties: []
    }
    this.drawTableBody = this.drawTableBody.bind(this)
    this.drawTableHeaders = this.drawTableHeaders.bind(this)
  }

  componentDidMount() {
    console.log('props', this.props)
    const tableData = this.props.tableData
    const headerColumns = this.props.columns
    let columns = []
    let properties = []

    if (headerColumns) {
      columns = headerColumns
      for (let key in tableData[0]) {
        properties.push(key)
      }
    } else {
      for (let key in tableData[0]) {
        properties.push(key)
        columns.push(key)
      }
    }

    this.setState({
      columns: columns,
      properties: properties
    })
  }

  render() {
    return (
      <React.Fragment>
        <table className="table table-striped">
          {this.drawTableHeaders()}
          {this.drawTableBody()}
        </table>
      </React.Fragment>
    )
  }


  drawTableHeaders() {
    return (
      <thead>
        <tr>
          {this.state.columns.map(column => {
            return (
              <th>
                {column}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  drawTableBody() {
    alert(this.state.properties)
    let properties = this.state.properties
    return (
      <tbody>
        {this.props.tableData.map(row => {
          return (
            <tr>
              {properties.map(rowData => {
                return (
                  <td>
                    {row[rowData]}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }
}

export default Table