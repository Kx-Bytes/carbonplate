export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              🌍 CarbonPlate
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Emissions data: Poore &amp; Nemecek (2018), <em>Science</em> 360(6392).{' '}
              <a
                href="https://ourworldindata.org/environmental-impacts-of-food"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-green-600"
              >
                doi:10.1126/science.aao0216
              </a>
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Open-source · Data cited in advocacy material · Not financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}
