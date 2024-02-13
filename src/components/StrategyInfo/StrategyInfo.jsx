import {STATES} from "../../core/settings";
import Graph from 'react-vis-network-graph'
import ReactMatrixTable from "@paraboly/react-matrix-table";

export const StrategyInfo = ({name, info}) => {
    const nodes = STATES.map((s, id) => ({id, label: s.toString()}));
    const edges = info.map((row, i) =>
        row.map((value, j) => ({
            from: i,
            to: j,
            title: value
        }))
    );

    const props = {
        rows: STATES,
        columns: STATES,
        data: info,
    };


    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', border: 'solid 1px'}}>
            <p>Strategy: {name}</p>

            <ReactMatrixTable
                rows={props.rows}
                columns={props.columns}
                data={props.data}
                cellColorFunction={props.cellColorFunction}
            />

            <Graph
                graph={{
                    nodes,
                    edges: edges.flat()
                }}
                options={{
                    layout: {
                      hierarchical: false
                    },
                    edges: {
                      color: "#000000"
                    },
                    height: "300px",
                    width: '100%'
                  }}
            />
        </div>
    )
}