import { emissionBgClass, emissionLabel, fmtCO2Short } from '../utils/formatters.js';

export default function EmissionBadge({ kgCO2, showLabel = false }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${emissionBgClass(kgCO2)}`}>
      {fmtCO2Short(kgCO2)}
      {showLabel && <span className="opacity-75">· {emissionLabel(kgCO2)}</span>}
    </span>
  );
}
