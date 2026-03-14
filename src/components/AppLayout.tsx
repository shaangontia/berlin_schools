import React, { useMemo, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Chip,
    Divider,
    Tooltip,
    Link,
    Stack,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    type SelectChangeEvent,
} from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PlaceIcon from '@mui/icons-material/Place';
import SchoolIcon from '@mui/icons-material/School';
import EuroIcon from '@mui/icons-material/Euro';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { School, SchoolType } from '../types/school';
import { SCHOOLS, REFERENCE_POINT } from '../data/schools';
import { computeDistances } from '../utils/helpers';
import SchoolsTable from './SchoolsTable';

type ViewMode = 'table' | 'grouped';
type TypeFilter = 'all' | SchoolType;

const DISTRICTS = [
    'All Districts',
    'Charlottenburg',
    'Friedrichshain',
    'Kreuzberg',
    'Mitte',
    'Pankow',
    'Prenzlauer Berg',
    'Steglitz',
    'Zehlendorf',
];

export default function App() {
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
    const [districtFilter, setDistrictFilter] = useState<string>('All Districts');

    const schoolsWithDistance: School[] = useMemo(
        () => computeDistances(SCHOOLS),
        [],
    );

    const filteredSchools = useMemo(() => {
        return schoolsWithDistance.filter((s) => {
            if (typeFilter !== 'all' && s.type !== typeFilter) return false;
            if (districtFilter !== 'All Districts' && s.district !== districtFilter)
                return false;
            return true;
        });
    }, [schoolsWithDistance, typeFilter, districtFilter]);

    const stats = useMemo(() => {
        const free = SCHOOLS.filter((s) => s.fees.structure === 'free').length;
        const incomeBased = SCHOOLS.filter(
            (s) => s.fees.structure === 'income-based',
        ).length;
        const fixed = SCHOOLS.filter((s) => s.fees.structure === 'fixed').length;
        return { free, incomeBased, fixed, total: SCHOOLS.length };
    }, []);

    const handleViewChange = (
        _: React.MouseEvent<HTMLElement>,
        next: ViewMode | null,
    ) => {
        if (next) setViewMode(next);
    };

    const handleTypeFilter = (
        _: React.MouseEvent<HTMLElement>,
        next: TypeFilter | null,
    ) => {
        if (next) setTypeFilter(next);
    };

    const handleDistrictChange = (e: SelectChangeEvent) => {
        setDistrictFilter(e.target.value);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(180deg, #0a0f1e 0%, #07090f 100%)',
                pb: 8,
            }}
        >
            {/* Hero header */}
            <Box
                sx={{
                    borderBottom: '1px solid rgba(148,163,184,0.1)',
                    background:
                        'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.0) 100%)',
                    pt: 6,
                    pb: 4,
                    mb: 2,
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <SchoolIcon sx={{ color: '#fff', fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '1.6rem', md: '2rem' },
                                    fontWeight: 800,
                                    background: 'linear-gradient(90deg, #f1f5f9, #93c5fd)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1.15,
                                }}
                            >
                                Berlin Primary Schools
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.25 }}
                            >
                                English–German bilingual primary schools guide · 2025/26
                            </Typography>
                        </Box>
                    </Box>

                    {/* Reference point banner */}
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 1,
                            background: 'rgba(96,165,250,0.08)',
                            border: '1px solid rgba(96,165,250,0.2)',
                            borderRadius: 2,
                            mb: 3,
                        }}
                    >
                        <PlaceIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ color: 'primary.light' }}>
                            Distances from{' '}
                            <Box component="span" sx={{ fontWeight: 700 }}>
                                {REFERENCE_POINT.label}
                            </Box>
                        </Typography>
                    </Paper>

                    {/* Stats row */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                        <Tooltip title="Total schools in guide">
                            <Chip
                                icon={<SchoolIcon sx={{ fontSize: '15px !important' }} />}
                                label={`${stats.total} Schools`}
                                sx={{
                                    background: 'rgba(148,163,184,0.1)',
                                    color: 'text.primary',
                                    fontWeight: 600,
                                    border: '1px solid rgba(148,163,184,0.15)',
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Public SESB schools with no tuition">
                            <Chip
                                icon={<EuroIcon sx={{ fontSize: '15px !important' }} />}
                                label={`${stats.free} Free (SESB)`}
                                color="success"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            />
                        </Tooltip>
                        <Tooltip title="Schools with income-based tuition">
                            <Chip
                                icon={<EuroIcon sx={{ fontSize: '15px !important' }} />}
                                label={`${stats.incomeBased} Income-based`}
                                color="warning"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            />
                        </Tooltip>
                        <Tooltip title="Schools with fixed annual or monthly fees">
                            <Chip
                                icon={<EuroIcon sx={{ fontSize: '15px !important' }} />}
                                label={`${stats.fixed} Fixed fee`}
                                color="info"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            />
                        </Tooltip>
                        <Tooltip title="Data as of March 2026 – click any row to expand details">
                            <Chip
                                icon={<CalendarMonthIcon sx={{ fontSize: '15px !important' }} />}
                                label="Data: March 2026"
                                variant="outlined"
                                sx={{
                                    fontWeight: 600,
                                    borderColor: 'divider',
                                    color: 'text.secondary',
                                }}
                            />
                        </Tooltip>
                    </Stack>

                    <Divider sx={{ mb: 3 }} />

                    {/* Controls row */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        {/* View mode */}
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}
                            >
                                VIEW
                            </Typography>
                            <ToggleButtonGroup
                                value={viewMode}
                                exclusive
                                onChange={handleViewChange}
                                size="small"
                                sx={{ height: 36 }}
                            >
                                <ToggleButton value="table" aria-label="flat table view">
                                    <TableChartIcon sx={{ fontSize: 16, mr: 0.75 }} />
                                    Table
                                </ToggleButton>
                                <ToggleButton value="grouped" aria-label="group by district">
                                    <AccountTreeIcon sx={{ fontSize: 16, mr: 0.75 }} />
                                    By District
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {/* Type filter */}
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}
                            >
                                TYPE
                            </Typography>
                            <ToggleButtonGroup
                                value={typeFilter}
                                exclusive
                                onChange={handleTypeFilter}
                                size="small"
                                sx={{ height: 36 }}
                            >
                                <ToggleButton value="all">All</ToggleButton>
                                <ToggleButton value="Private International">International</ToggleButton>
                                <ToggleButton value="Private Bilingual">Bilingual</ToggleButton>
                                <ToggleButton value="Public SESB">SESB (Free)</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {/* District filter */}
                        <Box sx={{ minWidth: 170 }}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}
                            >
                                DISTRICT
                            </Typography>
                            <FormControl size="small" fullWidth>
                                <Select
                                    value={districtFilter}
                                    onChange={handleDistrictChange}
                                    sx={{
                                        height: 36,
                                        '& .MuiSelect-select': { py: 0.75 },
                                        background: 'rgba(15,23,42,0.6)',
                                        borderRadius: 1,
                                    }}
                                >
                                    {DISTRICTS.map((d) => (
                                        <MenuItem key={d} value={d}>
                                            {d}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'flex-end', pb: 0.25 }}>
                            <Typography variant="caption" color="text.secondary">
                                Showing{' '}
                                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                    {filteredSchools.length}
                                </Box>{' '}
                                of {stats.total} schools · Click any row to expand details
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Table area */}
            <Container maxWidth="xl">
                <SchoolsTable
                    schools={filteredSchools}
                    groupByDistrict={viewMode === 'grouped'}
                />

                {/* Footnote */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        Data sourced from school websites as of March 2026. Fees and open
                        day dates may have changed — always verify on the{' '}
                        <Box component="span" sx={{ fontWeight: 700 }}>
                            official school website
                        </Box>
                        . Distance is straight-line (Haversine) from{' '}
                        <Link
                            href="https://maps.google.com/?q=Thorwaldsenstra%C3%9Fe+25,+12157+Berlin"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: 'primary.main' }}
                        >
                            {REFERENCE_POINT.label}
                        </Link>
                        .
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
