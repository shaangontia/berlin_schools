import { Box, Chip, Typography, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { School, SchoolType } from '../types/school';
import {
    feeRangeLabel,
    nextOrLatestOpenDay,
    formatDate,
} from '../utils/helpers';

interface SchoolTypeChipProps {
    type: SchoolType;
}

export function SchoolTypeChip({ type }: SchoolTypeChipProps) {
    const colorMap: Record<SchoolType, 'info' | 'secondary' | 'success' | 'primary' | 'warning'> = {
        'Private International': 'info',
        'Private Bilingual': 'secondary',
        'Private (Ersatzschule)': 'primary',
        'Public SESB': 'success',
        'Public International': 'warning',
    };
    const color = colorMap[type] ?? 'default';
    return (
        <Chip
            label={type}
            color={color}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.68rem', height: 22 }}
        />
    );
}

interface FeesCellProps {
    school: School;
}

export function FeesCell({ school }: FeesCellProps) {
    const { fees } = school;
    const label = feeRangeLabel(school);
    const color =
        fees.structure === 'free'
            ? 'success.main'
            : fees.structure === 'income-based'
                ? 'warning.main'
                : 'primary.main';

    return (
        <Tooltip title={fees.description} arrow placement="top">
            <Box sx={{ cursor: 'help', py: 2 }}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color, lineHeight: 1.2 }}
                >
                    {label}
                </Typography>
                {fees.structure === 'income-based' && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        income-based
                    </Typography>
                )}
            </Box>
        </Tooltip>
    );
}

interface OpenDayCellProps {
    school: School;
}

export function OpenDayCell({ school }: OpenDayCellProps) {
    const od = nextOrLatestOpenDay(school.openDays);
    const today = new Date().toISOString().split('T')[0];

    if (!od) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                    Not published
                </Typography>
            </Box>
        );
    }

    const isPast = od.date < today;

    return (
        <Box sx={{ py: 2 }}>
            <Typography
                variant="body2"
                sx={{
                    fontWeight: 600,
                    color: isPast ? 'text.secondary' : 'text.primary',
                    fontSize: '0.82rem',
                    lineHeight: 1.3,
                }}
            >
                {od.label && (
                    <Box component="span" sx={{ color: 'primary.main', mr: 0.5, display: 'block' }}>
                        {od.label}:
                    </Box>
                )}
                {formatDate(od.date)}
            </Typography>
            {od.time && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {od.time}
                </Typography>
            )}
            {isPast && (
                <Typography variant="caption" sx={{ color: 'error.main', display: 'block', fontSize: '0.68rem', mt: 0.5 }}>
                    Past date
                </Typography>
            )}
        </Box>
    );
}

interface NameCellProps {
    school: School;
}

export function NameCell({ school }: NameCellProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.3 }}
                >
                    {school.name}
                </Typography>
                <Tooltip title={`Visit ${school.name} website`} arrow>
                    <Box
                        component="a"
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 0.7,
                            '&:hover': { opacity: 1 },
                            transition: 'opacity 0.2s',
                            flexShrink: 0,
                        }}
                    >
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Box>
                </Tooltip>
            </Box>
            <Box>
                <SchoolTypeChip type={school.type} />
            </Box>
        </Box>
    );
}

interface DistanceCellProps {
    distanceKm?: number;
}

export function DistanceCell({ distanceKm }: DistanceCellProps) {
    if (distanceKm === undefined) return null;
    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.main', lineHeight: 1.2 }}>
                {distanceKm.toFixed(1)} km
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                from reference
            </Typography>
        </Box>
    );
}

interface RegisteredCellProps {
    isRegistered: boolean;
}

export function RegisteredCell({ isRegistered }: RegisteredCellProps) {
    return (
        <Box sx={{ py: 2 }}>
            <Chip
                label={isRegistered ? 'Registered' : 'Not Registered'}
                icon={isRegistered ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                color={isRegistered ? 'success' : 'default'}
                variant={isRegistered ? 'filled' : 'outlined'}
                size="small"
                sx={{
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    '& .MuiChip-icon': {
                        fontSize: 16,
                    },
                }}
            />
        </Box>
    );
}
