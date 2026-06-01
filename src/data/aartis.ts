// Re-export everything for backward compatibility
export type { Deity } from './deities';
export type { Aarti } from './aarti-list';
export { deities, getDeityById } from './deities';
export { aartis, getAartisByDeity, getAartiById } from './aarti-list';
