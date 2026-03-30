/**
 * Formatting utilities for display.
 */

export function fmtCO2(kg, decimals = 2) {
  if (kg === null || kg === undefined) return '—';
  if (kg < 0.01) return '<0.01 kg';
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} t`;
  return `${kg.toFixed(decimals)} kg`;
}

export function fmtCO2Short(kg) {
  if (kg < 0.1) return `${(kg * 1000).toFixed(0)}g`;
  return `${kg.toFixed(2)} kg`;
}

/** Return a Tailwind text-color class based on emission intensity */
export function emissionColorClass(kgCO2PerMeal) {
  if (kgCO2PerMeal < 0.5) return 'text-green-600';
  if (kgCO2PerMeal < 1.5) return 'text-yellow-600';
  if (kgCO2PerMeal < 3.0) return 'text-orange-500';
  return 'text-red-600';
}

export function emissionBgClass(kgCO2PerMeal) {
  if (kgCO2PerMeal < 0.5) return 'bg-green-100 text-green-800';
  if (kgCO2PerMeal < 1.5) return 'bg-yellow-100 text-yellow-800';
  if (kgCO2PerMeal < 3.0) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function emissionLabel(kgCO2PerMeal) {
  if (kgCO2PerMeal < 0.5) return 'Very Low';
  if (kgCO2PerMeal < 1.5) return 'Low';
  if (kgCO2PerMeal < 3.0) return 'Moderate';
  if (kgCO2PerMeal < 6.0) return 'High';
  return 'Very High';
}

export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
