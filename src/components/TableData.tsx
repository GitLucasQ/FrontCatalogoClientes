import { Delete, Edit, FileDownload } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { MRT_ColumnDef, MRT_Row, MaterialReactTable } from "material-react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IDataTable<T extends Record<string, any>> {
    columns: MRT_ColumnDef<T>[],
    data: T[],
    enableActions?: boolean,
    enableEdit?: boolean,
    enableDelete?: boolean,
    nameColumnOrderFirst?: string,
    showInitialFilters?: boolean,
    enableTopToolbar?: boolean,
    enableExportData?: boolean,
    handleEdit?: (row: MRT_Row<T>) => void,
    handleDelete?: (row: MRT_Row<T>) => void,
    handleExportData?: () => void
}

const TableData = <T extends object>({
    columns,
    data,
    enableActions = false,
    enableEdit = false,
    enableDelete = false,
    nameColumnOrderFirst = "id",
    showInitialFilters = false,
    enableTopToolbar = true,
    enableExportData,
    handleEdit,
    handleDelete,
    handleExportData
}: IDataTable<T>
) => {
    return (
        <>
            <Box sx={{ paddingX: 10, paddingY: 5 }}>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    // localization={MRT_Localization_ES}
                    enableEditing={enableActions}
                    initialState={{
                        showGlobalFilter: true,
                        showColumnFilters: showInitialFilters,
                        sorting: [{ id: nameColumnOrderFirst, desc: true }]
                    }}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    positionActionsColumn="last"
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            {
                                enableEdit ? (
                                    <Tooltip arrow title="Editar">
                                        <IconButton onClick={() => handleEdit?.(row)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                ) : <></>
                            }

                            {
                                enableDelete ? (
                                    <Tooltip arrow title="Eliminar">
                                        <IconButton onClick={() => handleDelete?.(row)}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                ) : <></>
                            }
                        </Box>
                    )}
                    enableTopToolbar={enableTopToolbar}
                    renderTopToolbarCustomActions={() => (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '16px',
                                padding: '8px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {
                                enableExportData &&
                                (
                                    <Button
                                        onClick={handleExportData}
                                        startIcon={<FileDownload />}
                                        color="success"
                                        variant="contained"
                                    >
                                        Descargar
                                    </Button>
                                )
                            }
                        </Box>
                    )}
                />
            </Box>
        </>
    )
}

export default TableData;