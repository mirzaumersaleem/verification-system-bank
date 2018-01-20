import React, { Component } from "react";
import { Table, Button } from 'react-bootstrap';

export default function TableView(tableRowData, tableHeaderData, showIndex) {

    return <Table responsive hover>
        <thead>
            <tr>
                {(tableHeaderData).map((headerValue, headerIndex) => <th key={headerIndex}>{headerValue}</th>)}
            </tr>
            {/* {Object.keys(tableHeaderObj).map((rowValue) => <tr><td>{rowValue.first}</td><td>{rowValue.second}</td><td>{rowValue.third}</td><td>{rowValue.fourth}</td><td>{rowValue.fifth}</td><td>{rowValue.sixth}</td><td>{rowValue.seventh}</td><td>{rowValue.eight}</td></tr>)} */}
        </thead>
        <tbody>
            {tableRowData.map((rowValue, rowIndex) => <tr key={rowIndex}>
                {(showIndex === true) ? <td>{rowIndex + 1}</td> : null}
                {Object.keys(rowValue).map((cellValue, cellIndex) => <td key={cellIndex}>{ rowValue[cellValue] }</td>)}
                {/* <td>{rowValue.customerName}</td><td>{rowValue.customerCNIC}</td><td>{rowValue.customerResidenceAddress}</td><td>{rowValue.customerWorkAddress}</td><td>{rowValue.residenceAddressStatus}</td><td>{rowValue.workAddressStatus}</td><td></td></tr> */}
            </tr>)}
        </tbody>
    </Table>
}
