import { useMemo, useState, useCallback, useEffect } from 'react';
import {
    DataGrid,
    type GridColDef,
    type GridRowsProp,
    type GridSortModel,
    type GridRowParams,
    GridToolbar,
} from '@mui/x-data-grid';
import { Box, Paper, Dialog, Zoom } from '@mui/material';
import type { School } from '../types/school';
import {
    feeSortKey,
    openDaySortKey,
    nextOrLatestOpenDay,
    formatDate,
    feeRangeLabel,
} from '../utils/helpers';
import {
    NameCell,
    FeesCell,
    OpenDayCell,
    DistanceCell,
} from './CellRenderers';
import SchoolDetailPanel from './SchoolDetailPanel';

interface SchoolsTableProps {
    schools: School[];
    groupByDistrict: boolean;
}

/** Build DataGrid rows from school objects */
function buildRows(schools: School[]): GridRowsProp {
    return schools.map((s) => ({
        id: s.id,
        school: s,
        name: s.name,
        district: s.district,
        type: s.type,
        // numeric sort keys
        feeSortKey: feeSortKey(s),
        openDaySortKey: openDaySortKey(s),
        distanceKm: s.distanceKm ?? Infinity,
        // display strings (for toolbar search)
        feesLabel: feeRangeLabel(s),
        openDayLabel: (() => {
            const od = nextOrLatestOpenDay(s.openDays);
            return od ? formatDate(od.date) : 'Not published';
        })(),
    }));
}

export default function SchoolsTable({
    schools,
    groupByDistrict,
}: SchoolsTableProps) {
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        { field: 'distanceKm', sort: 'asc' },
    ]);

    const rows = useMemo(() => buildRows(schools), [schools]);

    // Handle grouping by district via sorting
    useEffect(() => {
        if (groupByDistrict) {
            setSortModel([
                { field: 'district', sort: 'asc' },
                { field: 'distanceKm', sort: 'asc' },
            ]);
        } else {
            setSortModel([{ field: 'distanceKm', sort: 'asc' }]);
        }
    }, [groupByDistrict]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'School',
                flex: 2.2,
                minWidth: 240,
                sortable: true,
                renderCell: (params) => (
                    <NameCell school={params.row.school as School} />
                ),
                valueGetter: (_value: unknown, row: { name: string }) => row.name,
            },
            {
                field: 'district',
                headerName: 'District',
                flex: 0.9,
                minWidth: 120,
                sortable: true,
            },
            {
                field: 'type',
                headerName: 'Type',
                flex: 1.1,
                minWidth: 140,
                sortable: true,
            },
            {
                field: 'feeSortKey',
                headerName: 'Fees',
                flex: 1.3,
                minWidth: 160,
                sortable: true,
                renderCell: (params) => (
                    <FeesCell school={params.row.school as School} />
                ),
                valueFormatter: (_value: unknown, row: { feesLabel: string }) =>
                    row.feesLabel,
            },
            {
                field: 'openDaySortKey',
                headerName: 'Next Open Day',
                flex: 1.4,
                minWidth: 175,
                sortable: true,
                renderCell: (params) => (
                    <OpenDayCell school={params.row.school as School} />
                ),
                valueFormatter: (_value: unknown, row: { openDayLabel: string }) =>
                    row.openDayLabel,
            },
            {
                field: 'distanceKm',
                headerName: 'Distance',
                flex: 0.85,
                minWidth: 110,
                sortable: true,
                renderCell: (params) => (
                    <DistanceCell
                        distanceKm={
                            params.row.distanceKm === Infinity
                                ? undefined
                                : (params.row.distanceKm as number)
                        }
                    />
                ),
                valueFormatter: (value: unknown) => {
                    const v = value as number;
                    return v === Infinity ? '–' : `${v.toFixed(1)} km`;
                },
            },
        ],
        [],
    );

    const handleRowClick = useCallback((params: GridRowParams) => {
        setSelectedSchool(params.row.school as School);
    }, []);

    const handleClose = () => setSelectedSchool(null);

    return (
        <Paper
            elevation={0}
            sx={{
                background: 'rgba(17,24,39,0.85)',
                border: '1px solid rgba(148,163,184,0.1)',
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sortModel={sortModel}
                    onSortModelChange={(newModel) => setSortModel(newModel)}
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 100}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    density="comfortable"
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 300 },
                        },
                    }}
                    onRowClick={handleRowClick}
                    disableRowSelectionOnClick={true}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: 'rgba(15,23,42,0.8)',
                            color: 'text.secondary',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-row': {
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'rgba(96,165,250,0.06)',
                        },
                        '& .MuiDataGrid-row.Mui-selected': {
                            backgroundColor: 'rgba(96,165,250,0.1)',
                        },
                        '& .MuiDataGrid-row.Mui-selected:hover': {
                            backgroundColor: 'rgba(96,165,250,0.14)',
                        },
                        '& .MuiDataGrid-cell': {
                            borderColor: 'rgba(148,163,184,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: '1px solid rgba(148,163,184,0.1)',
                            backgroundColor: 'rgba(15,23,42,0.8)',
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            padding: '12px 16px',
                            gap: 1,
                            borderBottom: '1px solid rgba(148,163,184,0.1)',
                            backgroundColor: 'rgba(15,23,42,0.6)',
                        },
                        '& .MuiDataGrid-detailPanel': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiButtonBase-root': {
                            color: 'text.secondary',
                        },
                        '& .MuiDataGrid-sortIcon': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Box>
            {/* Detail Dialog */}
            <Dialog
                open={Boolean(selectedSchool)}
                onClose={handleClose}
                TransitionComponent={Zoom}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    },
                }}
            >
                {selectedSchool && (
                    <Box sx={{ p: { xs: 1, md: 3 } }}>
                        <SchoolDetailPanel school={selectedSchool} />
                    </Box>
                )}
            </Dialog>
        </Paper>
    );
}
