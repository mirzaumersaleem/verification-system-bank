import React, { Component } from "react";
// Material UI import
import { Table, TableRow, TableBody, TableHeader, TableHeaderColumn, TableRowColumn, RaisedButton } from 'material-ui';
import { Button } from 'react-bootstrap';

export default function TableView(tableRowData, tableHeaderData, showIndex) {
    return <Table adjustForCheckbox={false} displayRowCheckbox={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow className="assignmentTableRow">
                {(tableHeaderData).map((headerValue, headerIndex) => <TableHeaderColumn key={headerIndex} >{headerValue}</TableHeaderColumn>)}
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
            {tableRowData.map((rowValue, rowIndex) => <TableRow key={rowIndex} selectable={false}>
                {(showIndex === true) ? <TableRowColumn>{rowIndex + 1}</TableRowColumn> : null}
                {renderValue(rowValue)}
                {/* <td>{rowValue.customerName}</td><td>{rowValue.customerCNIC}</td><td>{rowValue.customerResidenceAddress}</td><td>{rowValue.customerWorkAddress}</td><td>{rowValue.residenceAddressStatus}</td><td>{rowValue.workAddressStatus}</td><td></td></tr> */}
            </TableRow>)}
        </TableBody>
    </Table>
}
export function TableBodyView(tableRowData, showIndex, statusDownload, type) {

    return <TableBody displayRowCheckbox={false} showRowHover={true}>
        {tableRowData.map((rowValue, rowIndex) => <TableRow key={rowIndex} selectable={false}>
            {(showIndex === true) ? <TableRowColumn style={{ width: '50px' }}>{rowIndex + 1}</TableRowColumn> : null}
            {renderValue(rowValue, statusDownload, type)}
            {/* <td>{rowValue.customerName}</td><td>{rowValue.customerCNIC}</td><td>{rowValue.customerResidenceAddress}</td><td>{rowValue.customerWorkAddress}</td><td>{rowValue.residenceAddressStatus}</td><td>{rowValue.workAddressStatus}</td><td></td></tr> */}
        </TableRow>)}
    </TableBody>
}

function renderValue(rowValue, statusDownload, type) {
    const val = Object.values(rowValue);
    return val.map((cellValue, cellIndex) => <TableRowColumn key={cellIndex} style={{ wordWrap: 'break-word', whiteSpace: 'normal', width: (type != "secondary" ? ((cellIndex + 1 === val.length) ? '120px' : '') : ""), paddingLeft: (type == "secondary" ? "8px" : "20px"), paddingRight: (type == "secondary" ? "8px" : "20px") }}> {(statusDownload === true) ? showDownloadLink(statusDownload, cellValue) : cellValue} </TableRowColumn>)
}

function showDownloadLink(statusDownload, cellValue) {
    if (cellValue === "Positive") {
        return <div style={{ color: '#008080' }}>{cellValue} <a href="#" target="_blank" className="pull-right">Download</a></div>
    } else if (cellValue === "Negative") {
        return <div style={{ color: 'red' }}>{cellValue} <a href="#" target="_blank" className="pull-right">Download</a></div>
    } else if (cellValue === "Pending") {
        return <div style={{ textAlign: 'center', color: 'gray' }}>{cellValue} </div>
    } else return <div>{cellValue}</div>
    // if (["Approved", "Disapproved"].includes(cellValue)) {
    //     return <span style={}>{cellValue} <Button bsStyle="link">Download</Button></span>
    // }
    // return val.map((cellValue, cellIndex) => <TableRowColumn key={cellIndex}> <span>{cellValue}</span> </TableRowColumn>)
}
/*<TableRowColumn> {<Moment format="MM/DD/YYYY HH:mm">{assignment['submission_date']}</Moment>} </TableRowColumn>*/