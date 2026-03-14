import type { School, OpenDay } from '../types/school';
import { REFERENCE_POINT } from '../data/schools';

/**
 * Haversine formula – returns distance in km between two lat/lng points.
 */
export function haversineKm(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function computeDistances(schools: School[]): School[] {
    return schools.map((s) => ({
        ...s,
        distanceKm: haversineKm(
            REFERENCE_POINT.lat,
            REFERENCE_POINT.lng,
            s.lat,
            s.lng,
        ),
    }));
}

/** Returns the next upcoming open day on or after today, or the last past one. */
export function nextOrLatestOpenDay(openDays: OpenDay[]): OpenDay | null {
    if (!openDays.length) return null;
    const today = new Date().toISOString().split('T')[0];
    const upcoming = openDays
        .filter((d) => d.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));
    if (upcoming.length) return upcoming[0];
    // All are past – return the most recent past one
    return [...openDays].sort((a, b) => b.date.localeCompare(a.date))[0];
}

/** Format an ISO date string to a human-readable format: "5 Sep 2026" */
export function formatDate(isoDate: string): string {
    const d = new Date(isoDate + 'T00:00:00'); // force local interpretation
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/** Returns the fee range string for display */
export function feeRangeLabel(school: School): string {
    const { fees } = school;
    if (fees.structure === 'free') return 'Free';
    if (fees.structure === 'income-based') {
        if (fees.minMonthly !== null && fees.maxMonthly !== null) {
            return `€${fees.minMonthly}–€${fees.maxMonthly}/mo`;
        }
        return 'Income-based';
    }
    // fixed
    if (fees.annualEur) {
        return `€${fees.annualEur.toLocaleString()}/yr`;
    }
    if (fees.minMonthly !== null) {
        return `€${fees.minMonthly}/mo`;
    }
    return 'See website';
}

/**
 * Numeric sort key for fees – lower is better, unknown goes last.
 */
export function feeSortKey(school: School): number {
    if (school.fees.structure === 'free') return 0;
    if (school.fees.minMonthly !== null) return school.fees.minMonthly;
    if (school.fees.annualEur) return school.fees.annualEur / 12;
    return Infinity;
}

/**
 * Numeric sort key for open days – next upcoming date as timestamp, or Infinity.
 */
export function openDaySortKey(school: School): number {
    const od = nextOrLatestOpenDay(school.openDays);
    if (!od) return Infinity;
    return new Date(od.date + 'T00:00:00').getTime();
}
