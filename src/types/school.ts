export type SchoolType =
  | 'Private International'
  | 'Private Bilingual'
  | 'Private (Ersatzschule)'
  | 'Public SESB'
  | 'Public International';

export type FeeStructure =
  | 'fixed'
  | 'income-based'
  | 'free';

export interface OpenDay {
  date: string; // ISO date string e.g. "2026-09-05"
  time?: string; // e.g. "10:00–14:00"
  label?: string; // e.g. "Open House"
}

export interface Fees {
  structure: FeeStructure;
  /** Minimum monthly fee in EUR (null if unknown / free) */
  minMonthly: number | null;
  /** Maximum monthly fee in EUR (null if fixed or unknown) */
  maxMonthly: number | null;
  /** For fixed fees, the annual amount in EUR */
  annualEur?: number | null;
  description: string;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  type: SchoolType;
  district: string;
  /** Berlin district code for grouping */
  districtCode: string;
  website: string;
  openDays: OpenDay[];
  openDayNote: string;
  fees: Fees;
  /** Lat/lng for distance calculation */
  lat: number;
  lng: number;
  /** Computed distance in km from reference point – populated at runtime */
  distanceKm?: number;
  /** Whether registered for open school/days */
  isRegistered: boolean;
}
