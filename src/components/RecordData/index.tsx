'use strict';

import {
    ColDef,
    GetRowIdParams,
    RowSelectionOptions,
    ValueFormatterParams
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IRow } from '../../models/rows';
import * as recordsService from '../../services/records-services';
import * as deleteRecords from '../../services/delete-services';
import { Button, FlexboxGrid, Text } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import AddOutlineIcon from '@rsuite/icons/AddOutline';


const dateFormatter = (params: ValueFormatterParams): string => {
    return new Date(params.value).toLocaleDateString("en-us", {

        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",

    });
};


const rowSelection: RowSelectionOptions = {
    mode: 'singleRow',
    checkboxes: true,
    enableClickSelection: true,
};

export default function GridData() {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "75vh", width: "90wh" }), []);

    const gridApiRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<IRow[]>([]);

    const [columnDefs] = useState<ColDef[]>([

        {
            headerName: "Id",
            field: "recordId",
            width: 120,
            headerTooltip: "Operation Id",
            filter: true
        },
        {
            headerName: "Created At",
            field: "createdAt",
            valueFormatter: dateFormatter,
            width: 200,
            headerTooltip: "Timestamp"
        },
        {
            headerName: "Operand One",
            field: "operandOne",
            width: 150,
            headerTooltip: "First Operand"
        },
        {
            headerName: "Operand Two",
            field: "operandTwo",
            width: 150,
            headerTooltip: "Second Operand"
        },
        {
            headerName: "Operator",
            field: "operator",
            width: 150,
            headerTooltip: "Operator",
            filter: true
        },
        {
            headerName: "Result",
            field: "result",
            valueFormatter: (params: ValueFormatterParams) => {
                return params.value.toLocaleString();
            },
            width: 150,
            headerTooltip: "Result",
            filter: true
        },
        {
            headerName: "Cost",
            field: "cost",
            valueFormatter: (params: ValueFormatterParams) => {
                return "$" + params.value.toLocaleString();
            },
            width: 150,
            headerTooltip: "Cost",
            filter: true
        },
        {
            headerName: "Username",
            field: "username",
            width: 250,
            headerTooltip: "Username"
        },

    ]);

    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            headerName: 'Operation Id',
            cellRenderer: 'agGroupCellRenderer',
            field: 'recordId',
        };
    }, []);

    const onGridReady = useCallback(() => {

        recordsService.findRecords(0, 1000, 0, 1000)
            .then(response => {
                setRowData(response.data.records);
            })

    }, []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true,
        };
    }, []);

    const getRowId = useCallback(function (params: GetRowIdParams) {
        return params.data.recordId;
    }, []);

   
    const removeSelected = useCallback(() => {
        const selectedData = gridApiRef.current!.api.getSelectedRows();
        const record: number = selectedData[0].recordId;
        deleteRecords.deleteRecordsById(record);
        gridApiRef.current!.api.applyTransaction({
            remove: selectedData,
        })!;
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}></div>
            <div
                style={gridStyle}
                className={
                    "ag-theme-quartz-dark"
                }
            >
                <div style={{ marginBottom: '5px', minHeight: '30px' }}>
                    <FlexboxGrid justify="end">
                        <Button size="xs" appearance="ghost" 
                            startIcon={<AddOutlineIcon />} 
                            onClick={removeSelected}>
                            <Text weight="medium" color="orange" size="md">Delete</Text>
                        </Button>
                    </FlexboxGrid>
                </div>
                <AgGridReact
                    ref={gridApiRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    rowSelection={rowSelection}
                    autoGroupColumnDef={autoGroupColumnDef}
                    groupDefaultExpanded={1}
                    getRowId={getRowId}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );

}


