'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import _ from "lodash"; // cool kids know _ is low-dash

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [stockData, setStockData] = useState();
  const [mergeData,setMergeData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'stockclassification', rowGroup: true, hide: true },
    { field: 'company'},
    { field: 'noofshares'},
    { field: 'shareprice' },
    { field: 'currentvalue' },
    { field: 'costbasis' },
    { field: 'dividend' },
    { field: 'amount' }
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://7lmqkl7jv5.execute-api.us-east-1.amazonaws.com/dev/dynamoDBIntegration')
      .then((resp) => resp.json())
      .then((data) => getShareInfo(data.Items));
  }, []);

  const getShareInfo =((data) =>{
    for (const element of data) {
      console.log(element.stockticker);
      fetch('https://finnhub.io/api/v1/quote?symbol='+element.stockticker+'&token=cfaqjfiad3i65pt1k7qgcfaqjfiad3i65pt1k7r0')
      .then((resp) => resp.json())
      .then((response) => 
       {
        element.currentvalue = (response.c* element.noofshares).toFixed(2);
        element.shareprice = response.c;
       });
    }
    setRowData(data);
  });

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={'singleColumn'}
          animateRows={true}
          groupRowsSticky={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default function Portfolioview() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{height:"400px"}}>
      <GridExample></GridExample>
      </div>
    </div>
  );
}