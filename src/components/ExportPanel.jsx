import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { fmtCO2 } from '../utils/formatters.js';

export default function ExportPanel({ comparison, targetRef }) {
  const [exporting, setExporting] = useState(false);

  const handleExportImage = async () => {
    const el = targetRef?.current;
    if (!el) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f9fafb',
      });
      const link = document.createElement('a');
      link.download = 'carbonplate-report.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    }
    setExporting(false);
  };

  const handleCopyStats = () => {
    if (!comparison) return;
    const text = [
      `CarbonPlate — Weekly Food Carbon Footprint Report`,
      `Generated: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      ``,
      `Current weekly diet: ${fmtCO2(comparison.current.totalKgCO2)} CO₂eq`,
      `Plant-based equivalent: ${fmtCO2(comparison.plantBased.totalKgCO2)} CO₂eq`,
      `Weekly saving: ${fmtCO2(comparison.reductionKg)} CO₂eq (${comparison.reductionPct}% reduction)`,
      `Annual saving: ${fmtCO2(comparison.annualSavingKg)} CO₂eq`,
      `Equivalent to: ${comparison.carKmEquivalent.toLocaleString()} km not driven`,
      ``,
      `Data source: Poore & Nemecek (2018), Science 360(6392). doi:10.1126/science.aao0216`,
      `Tool: CarbonPlate — https://github.com/`,
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => alert('Stats copied to clipboard!'));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3">Export & Share</h3>
      <p className="text-xs text-gray-500 mb-4">
        Results are citable using Poore &amp; Nemecek (2018) as the primary data source.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExportImage}
          disabled={exporting}
          className="btn-primary text-sm flex items-center gap-2"
        >
          {exporting ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <span>📷</span>
          )}
          Save as Image
        </button>
        <button
          onClick={handleCopyStats}
          className="btn-secondary text-sm"
        >
          📋 Copy Stats
        </button>
        <button
          onClick={handlePrint}
          className="btn-secondary text-sm no-print"
        >
          🖨️ Print / PDF
        </button>
      </div>
      {comparison && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 font-mono leading-relaxed">
          <p className="font-semibold text-gray-700 mb-1">Suggested citation:</p>
          <p>
            Food carbon footprint calculated using CarbonPlate, based on emission
            factors from Poore, J. &amp; Nemecek, T. (2018).{' '}
            <em>Reducing food&apos;s environmental impacts through producers and consumers.</em>{' '}
            Science, 360(6392), 987–992. doi:10.1126/science.aao0216.
          </p>
          <p className="mt-1 text-gray-500">
            Weekly diet: {fmtCO2(comparison.current.totalKgCO2)} CO₂eq ·
            Plant-based equivalent: {fmtCO2(comparison.plantBased.totalKgCO2)} CO₂eq ·
            Reduction: {comparison.reductionPct}%
          </p>
        </div>
      )}
    </div>
  );
}
