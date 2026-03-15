import {
    Box,
    Typography,
    Chip,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { School } from '../types/school';
import {
    feeRangeLabel,
    formatDate,
    nextOrLatestOpenDay,
} from '../utils/helpers';
import { SchoolTypeChip } from './CellRenderers';

interface SchoolDetailPanelProps {
    school: School;
}

export default function SchoolDetailPanel({ school }: SchoolDetailPanelProps) {
    const nextOd = nextOrLatestOpenDay(school.openDays);
    const today = new Date().toISOString().split('T')[0];

    return (
        <Paper
            elevation={0}
            sx={{
                m: 2,
                p: 3,
                background:
                    'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)',
                border: '1px solid rgba(148,163,184,0.15)',
                borderRadius: 3,
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {school.name}
                        </Typography>
                        <Tooltip title="Visit website">
                            <IconButton
                                component="a"
                                href={school.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ color: 'primary.main' }}
                            >
                                <OpenInNewIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <SchoolTypeChip type={school.type} />
                        <Chip
                            icon={<PlaceIcon sx={{ fontSize: '14px !important' }} />}
                            label={school.district}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.68rem', height: 22, borderColor: 'divider' }}
                        />
                        <Chip
                            icon={school.isRegistered ? <CheckCircleIcon sx={{ fontSize: '14px !important' }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: '14px !important' }} />}
                            label={school.isRegistered ? 'Registered' : 'Not Registered'}
                            size="small"
                            color={school.isRegistered ? 'success' : 'default'}
                            variant={school.isRegistered ? 'filled' : 'outlined'}
                            sx={{ fontSize: '0.68rem', height: 22 }}
                        />
                    </Box>
                </Box>
                {school.distanceKm !== undefined && (
                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 800, color: 'secondary.main', lineHeight: 1 }}
                        >
                            {school.distanceKm.toFixed(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            km away
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                {/* Fees section */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <EuroIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Fees
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            color:
                                school.fees.structure === 'free'
                                    ? 'success.main'
                                    : school.fees.structure === 'income-based'
                                        ? 'warning.main'
                                        : 'primary.main',
                            mb: 0.5,
                        }}
                    >
                        {feeRangeLabel(school)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                    >
                        {school.fees.description}
                    </Typography>
                </Box>

                {/* Open days section */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <CalendarMonthIcon sx={{ color: 'secondary.main', fontSize: 18 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                            Open Days / Events
                        </Typography>
                    </Box>
                    {school.openDays.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No open days currently published.
                        </Typography>
                    ) : (
                        <List dense disablePadding>
                            {school.openDays.map((od, i) => {
                                const isPast = od.date < today;
                                const isNext = nextOd?.date === od.date;
                                return (
                                    <ListItem
                                        key={i}
                                        disableGutters
                                        sx={{
                                            py: 0.25,
                                            opacity: isPast ? 0.55 : 1,
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                    {isNext && !isPast && (
                                                        <Chip
                                                            label="Next"
                                                            size="small"
                                                            color="primary"
                                                            sx={{ height: 16, fontSize: '0.6rem', '& .MuiChip-label': { px: 0.75 } }}
                                                        />
                                                    )}
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ fontWeight: isNext && !isPast ? 700 : 400 }}
                                                    >
                                                        {od.label ? `${od.label}: ` : ''}
                                                        {formatDate(od.date)}
                                                        {od.time ? ` · ${od.time}` : ''}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                    {school.openDayNote && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1, display: 'block', fontStyle: 'italic', lineHeight: 1.5 }}
                        >
                            {school.openDayNote}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}
