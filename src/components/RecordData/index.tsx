'use strict';

import './styles.css';
import {
    ColDef,
    GridApi,
    ModuleRegistry,
    ValueFormatterParams,
    ClientSideRowModelModule,
    GetRowIdParams
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef, useState } from 'react';
import { IRow } from '../../models/rows';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import * as recordsService from '../../services/records-services'


export function RecordData() {


    const gridApiRef = useRef<AgGridReact>(null); 
    const [rowData, setRowData] = useState<IRow[]>([]);


    
    const onGridReady = useCallback(() => {

        recordsService.findRecords(0, 1000, 0, 1000)
          .then(response => {
            setRowData(response.data.records);
        })

    }, []);

    const dateFormatter = (params: ValueFormatterParams): string => {
        return new Date(params.value).toLocaleDateString("en-us", {

            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",

        });
    };


    const [colDefs] = useState<ColDef[]>([

        {
            field: "recordId",
            width: 120,
            filter: true,
            checkboxSelection: true,
            headerTooltip: "Record Id"
        },
        {
            field: "createdAt",
            valueFormatter: dateFormatter,
            width: 200,
            headerTooltip: "Timestamp"

        },
        {
            field: "operandOne",
            width: 150,
            headerTooltip: "First Operand"

        },
        {
            field: "operandTwo",
            width: 150,
            headerTooltip: "Second Operand"


        },
        {
            field: "operator",
            width: 150,
            headerTooltip: "Operator"

        },
        {
            field: "result",
            valueFormatter: (params: ValueFormatterParams) => {
                return params.value.toLocaleString();
            },
            width: 150,
            headerTooltip: "Result"

        },
        {
            field: "cost",
            valueFormatter: (params: ValueFormatterParams) => {
                return "$" + params.value.toLocaleString();
            },
            width: 150,
            headerTooltip: "st"

        },
        {
            field: "username",
            width: 250,
            headerTooltip: "Username"

        },


    ]);
     
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true,
        };
    }, []);

    const getRowId = useCallback(function (params: GetRowIdParams) {
        return params.data.symbol;
    }, []);

    const reverseItems = useCallback(() => {
        const reversedData = rowData.slice().reverse();
        setRowData(reversedData);
    }, [rowData]);

    const removeSelected = useCallback(() => {
        const selectedRowNodes = gridApiRef.current!.api.getSelectedNodes();
        const selectedIds = selectedRowNodes.map(function (rowNode) {
            return rowNode.id;
        });
        const filteredData = rowData.filter(function (dataItem) {
            return selectedIds.indexOf(dataItem.symbol) < 0;
        });
        setRowData(filteredData);
    }, [rowData]);

    return (
        <div className="container-grid">
            <div
                className={
                    "ag-theme-quartz-dark"
                }

                style={{ width: "100%", height: "75vh" }}
            >
                <div style={{ marginBottom: '2px', minHeight: '1rem', backgroundColor: 'none' }}>
                    <button onClick={reverseItems}>Reverse</button>
                    <button style={{ backgroundColor: 'blue' }} onClick={removeSelected}>Remove</button>
                </div>

                <AgGridReact
                    rowData={rowData}
                    rowSelection={'single'}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                    }
                    getRowId={getRowId}
                    onGridReady={onGridReady}
                />

            </div>
        </div>
    );
};

