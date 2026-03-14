import type { School } from '../types/school';

/**
 * Reference coordinate: Thorwaldsenstraße 25, 12157 Berlin (Steglitz)
 * Lat: 52.4598, Lng: 13.3459
 */
export const REFERENCE_POINT = {
    lat: 52.4598,
    lng: 13.3459,
    label: 'Thorwaldsenstraße 25, 12157 Berlin',
};

export const SCHOOLS: School[] = [
    {
        id: 'bis',
        name: 'Berlin International School',
        shortName: 'BIS',
        type: 'Private International',
        district: 'Zehlendorf',
        districtCode: 'zehlendorf',
        website: 'https://www.berlin-international-school.de/en/',
        openDays: [],
        openDayNote:
            'No currently published primary open day found on the public admissions/news pages.',
        fees: {
            structure: 'fixed',
            minMonthly: 1025,
            maxMonthly: 1125,
            annualEur: 12300,
            description:
                '2025/26: €13,500/year listed; currently payable €12,300/year (after Berlin lunch reimbursement, Grades 1–6), payable in 12 instalments.',
        },
        lat: 52.4302,
        lng: 13.2384,
    },
    {
        id: 'bbs',
        name: 'Berlin British School – Primary',
        shortName: 'BBS',
        type: 'Private International',
        district: 'Charlottenburg',
        districtCode: 'charlottenburg',
        website: 'https://www.berlinbritishschool.de/',
        openDays: [],
        openDayNote:
            'No clearly published open day date found; BBS handles admissions via enquiry/visits.',
        fees: {
            structure: 'fixed',
            minMonthly: null,
            maxMonthly: null,
            description:
                '2025/26 fees page is published with separate fee schedules for international and state-recognised bilingual streams. Exact primary amounts are in PDF documents.',
        },
        lat: 52.5027,
        lng: 13.2825,
    },
    {
        id: 'bms',
        name: 'Berlin Metropolitan School – Primary',
        shortName: 'BMS',
        type: 'Private International',
        district: 'Mitte',
        districtCode: 'mitte',
        website: 'https://metropolitanschool.com/en/',
        openDays: [
            {
                date: '2026-03-13',
                label: 'Open House / Festival of Learning',
            },
        ],
        openDayNote: 'Open House / Festival of Learning: 13 March 2026.',
        fees: {
            structure: 'income-based',
            minMonthly: null,
            maxMonthly: null,
            description:
                'Fees are income-based; tuition calculated from total positive income. Lunch is free for Primary.',
        },
        lat: 52.5282,
        lng: 13.3882,
    },
    {
        id: 'bbils',
        name: 'Berlin Bilingual School – Primary',
        shortName: 'BBS-Bilingual',
        type: 'Private Bilingual',
        district: 'Prenzlauer Berg',
        districtCode: 'prenzlauer-berg',
        website: 'https://berlin-bilingual-school.de/en',
        openDays: [
            {
                date: '2026-09-05',
                time: '10:00–14:00',
                label: 'Primary Open House 26',
            },
        ],
        openDayNote: 'Primary Open House 26: 5 September 2026, 10:00–14:00.',
        fees: {
            structure: 'income-based',
            minMonthly: 100,
            maxMonthly: 513,
            description:
                'Income-based tuition: €100–€513/month. Hort voucher required; after-school care costs set by the district office.',
        },
        lat: 52.5375,
        lng: 13.4137,
    },
    {
        id: 'fsas',
        name: 'Freie Schule Anne-Sophie Berlin – Elementary',
        shortName: 'FSAS',
        type: 'Private Bilingual',
        district: 'Pankow',
        districtCode: 'pankow',
        website: 'https://www.freie-schule-anne-sophie.de/en/berlin/',
        openDays: [
            { date: '2026-03-24', time: '18:00', label: 'Info Evening' },
            { date: '2026-04-29', time: '18:00', label: 'Info Evening' },
            { date: '2026-05-28', time: '18:00', label: 'Info Evening' },
            { date: '2026-06-17', time: '18:00', label: 'Info Evening' },
        ],
        openDayNote:
            '24 Mar 2026, 29 Apr 2026, 28 May 2026, 17 Jun 2026 – all at 18:00 (Entrance Class & Primary info events).',
        fees: {
            structure: 'income-based',
            minMonthly: 240,
            maxMonthly: 440,
            description:
                'Income-based (up to Grade 6): €240/month from €30,000 gross family income; €350/month from €50,000; €440/month from €70,000.',
        },
        lat: 52.5756,
        lng: 13.4246,
    },
    {
        id: 'phorms-mitte',
        name: 'Phorms Berlin Mitte – Primary',
        shortName: 'Phorms Mitte',
        type: 'Private Bilingual',
        district: 'Mitte',
        districtCode: 'mitte',
        website: 'https://berlin-mitte.phorms.de/en/',
        openDays: [
            { date: '2026-04-14', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-06-23', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-09-26', time: '11:00', label: 'Open Day' },
        ],
        openDayNote:
            'Open Day: 26 Sep 2026, 11:00. Also: 14 Apr 2026 & 23 Jun 2026, 9:30–11:00 (primary open mornings).',
        fees: {
            structure: 'income-based',
            minMonthly: 123,
            maxMonthly: 867,
            description:
                '2026/27 income-based primary tuition: €123–€867/month. Below €50,000 income: €123–€543/month.',
        },
        lat: 52.5199,
        lng: 13.3833,
    },
    {
        id: 'phorms-sued',
        name: 'Phorms Berlin Süd – Primary',
        shortName: 'Phorms Süd',
        type: 'Private Bilingual',
        district: 'Steglitz',
        districtCode: 'steglitz',
        website: 'https://berlin.phorms.de/en/',
        openDays: [
            { date: '2026-05-21', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-09-24', time: '16:00', label: 'Open Day' },
        ],
        openDayNote:
            'Open Day: 24 Sep 2026, 16:00. Also: 21 May 2026, 9:30–11:00 (primary open morning).',
        fees: {
            structure: 'income-based',
            minMonthly: 123,
            maxMonthly: 867,
            description:
                '2026/27 income-based primary tuition: €123–€867/month. Below €50,000 income: €123–€543/month.',
        },
        lat: 52.4373,
        lng: 13.3322,
    },
    {
        id: 'phorms-pb',
        name: 'Phorms Berlin Prenzlauer Berg – Primary',
        shortName: 'Phorms PB',
        type: 'Private Bilingual',
        district: 'Prenzlauer Berg',
        districtCode: 'prenzlauer-berg',
        website: 'https://berlin.phorms.de/en/',
        openDays: [
            { date: '2026-03-18', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-04-22', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-05-20', time: '09:30–11:00', label: 'Open Morning' },
            { date: '2026-06-17', time: '09:30–11:00', label: 'Open Morning' },
        ],
        openDayNote:
            '18 Mar, 22 Apr, 20 May, 17 Jun 2026 – all 9:30–11:00 (primary open mornings).',
        fees: {
            structure: 'income-based',
            minMonthly: 123,
            maxMonthly: 867,
            description:
                '2026/27 income-based primary tuition: €123–€867/month. Below €50,000 income: €123–€543/month.',
        },
        lat: 52.5396,
        lng: 13.4215,
    },
    {
        id: 'bcs',
        name: 'Berlin Cosmopolitan School – Primary',
        shortName: 'BCS',
        type: 'Private Bilingual',
        district: 'Pankow',
        districtCode: 'pankow',
        website: 'https://bcs.berlin/',
        openDays: [],
        openDayNote:
            'No clearly published upcoming primary open day found on the public site.',
        fees: {
            structure: 'fixed',
            minMonthly: null,
            maxMonthly: null,
            description:
                'School fee regulation PDF for 2024/25 found, but no clearly accessible newer primary-fee page on the public site.',
        },
        lat: 52.5605,
        lng: 13.4072,
    },
    {
        id: 'ims',
        name: 'International Montessori School Berlin',
        shortName: 'IMS',
        type: 'Private Bilingual',
        district: 'Zehlendorf',
        districtCode: 'zehlendorf',
        website: 'https://www.montessori-am-wannsee.de/en/home/',
        openDays: [
            { date: '2026-02-28', label: 'Open Day' },
            { date: '2026-03-10', time: '18:00', label: 'Information Evening' },
        ],
        openDayNote:
            'Open Day: 28 Feb 2026; Information Evening: 10 Mar 2026, 18:00.',
        fees: {
            structure: 'income-based',
            minMonthly: null,
            maxMonthly: null,
            description:
                'Fee information found via school-group pages, but no clean school-hosted primary fee table found on the public site.',
        },
        lat: 52.4335,
        lng: 13.1753,
    },
    {
        id: 'platanus',
        name: 'Platanus School Berlin – Primary',
        shortName: 'Platanus',
        type: 'Private Bilingual',
        district: 'Friedrichshain',
        districtCode: 'friedrichshain',
        website: 'https://www.platanus-schule.de/en/',
        openDays: [],
        openDayNote:
            'Open house/info event page exists but is specifically for Years 7–13; no clearly published primary-only open day found.',
        fees: {
            structure: 'income-based',
            minMonthly: null,
            maxMonthly: null,
            description:
                'Income-based; eldest child pays full monthly fee, siblings receive reductions. Exact primary fee scale not publicly exposed.',
        },
        lat: 52.5163,
        lng: 13.4599,
    },
    {
        id: 'cdg',
        name: 'Charles-Dickens-Grundschule',
        shortName: 'CDG',
        type: 'Public SESB',
        district: 'Steglitz',
        districtCode: 'steglitz',
        website: 'https://www.charles-dickens-grundschule.de/en/',
        openDays: [
            { date: '2025-09-20', time: '10:00–13:00', label: 'Open Day' },
        ],
        openDayNote: 'Open Day: Saturday, 20 September 2025, 10:00–13:00.',
        fees: {
            structure: 'free',
            minMonthly: 0,
            maxMonthly: 0,
            description: 'No tuition – public SESB primary school.',
        },
        lat: 52.4487,
        lng: 13.3235,
    },
    {
        id: 'galilei',
        name: 'Galilei-Grundschule',
        shortName: 'Galilei',
        type: 'Public SESB',
        district: 'Kreuzberg',
        districtCode: 'kreuzberg',
        website: 'https://galilei-grundschule.de/',
        openDays: [
            { date: '2023-09-23', time: '10:00–14:00', label: 'Open House' },
        ],
        openDayNote:
            'Latest open house found: Saturday, 23 September 2023, 10:00–14:00. No newer posting found.',
        fees: {
            structure: 'free',
            minMonthly: 0,
            maxMonthly: 0,
            description: 'No tuition – public SESB primary school.',
        },
        lat: 52.4979,
        lng: 13.4034,
    },
    {
        id: 'qbgs',
        name: 'Quentin-Blake-Grundschule',
        shortName: 'QBGS',
        type: 'Public SESB',
        district: 'Steglitz',
        districtCode: 'steglitz',
        website: 'https://qbgs.de/',
        openDays: [
            { date: '2025-09-30', time: '14:30', label: 'Visit Date' },
            { date: '2025-11-04', time: '14:30', label: 'Visit Date' },
            { date: '2025-12-02', time: '14:30', label: 'Visit Date' },
            { date: '2026-01-13', time: '14:30', label: 'Visit Date' },
            { date: '2026-02-10', time: '14:30', label: 'Visit Date' },
            { date: '2026-03-03', time: '14:30', label: 'Visit Date' },
            { date: '2026-04-14', time: '14:30', label: 'Visit Date' },
            { date: '2026-05-05', time: '14:30', label: 'Visit Date' },
            { date: '2026-06-02', time: '14:30', label: 'Visit Date' },
            { date: '2026-06-30', time: '14:30', label: 'Visit Date' },
        ],
        openDayNote:
            'Monthly visit dates at 14:30 throughout the year – next upcoming shown in table.',
        fees: {
            structure: 'free',
            minMonthly: 0,
            maxMonthly: 0,
            description: 'No tuition – public SESB primary school.',
        },
        lat: 52.4526,
        lng: 13.3299,
    },
];
