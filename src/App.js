import logo from './logo.svg';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useMemo, useState } from 'react';
import { data, flatten, preprocess, rawData, renameNestings } from './utils/flatten';
import Graph from "react-vis-network-graph";
import { run } from './core';
import { StrategyInfo } from './components/StrategyInfo/StrategyInfo';
import {STRATS, P, STATES, n} from './core/settings';
import ReactMatrixTable from "@paraboly/react-matrix-table";

function App() {
  const [rowData, setRowData] = useState(() => flatten(renameNestings(rawData, ['faculties', 'departments'])));
  const columnDefs = useMemo(() => [
    { headerName: "id", field: "id" }
  ], []);

  function getDataPath(dataItem) {
    return dataItem.path;
  }

  const [vList, dList] = run()

  
  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const data = [
      ...STATES.map((_, index) => vList.map(v => v[index])),
      ...STATES.map((_, index) => dList.map(v => v[index]))
  ];
  const props = {
    columns: Array.from({length: n+1}, (_, i) => i),
    rows: ['v', 'd'].map(item => STATES.map(s => `${item}${s}(${n})`)).flat(),
    data,
  };

  return (
    <div className="App" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px', padding: '10px', justifyItems: 'center'}}>
        {
          STRATS.map((s, index) => <StrategyInfo name={s} info={P[index]} key={index}/>)
        }
      </div>

      <ReactMatrixTable
          rows={props.rows}
          columns={props.columns}
          data={props.data}
          cellColorFunction={props.cellColorFunction}
      />
    </div>
  );
}

export default App;
