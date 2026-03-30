import { INGREDIENTS, CATEGORIES } from '../data/emissions.js';

const SOURCES = [
  {
    key: 'poore2018',
    citation:
      'Poore, J. & Nemecek, T. (2018). Reducing food\'s environmental impacts through producers and consumers. Science, 360(6392), 987–992.',
    doi: 'https://www.science.org/doi/10.1126/science.aao0216',
    description:
      'The primary source for all animal-product, grain, legume, oil, and vegetable emission factors in this tool. The largest meta-analysis of food lifecycle assessments ever conducted: 570 studies, >38,000 farms, 119 countries, 40 food products. Data covers the full supply chain from land use change through farming, processing, transport, and packaging.',
    usedFor: 'Beef, lamb, pork, chicken, dairy, eggs, fish (farmed), shrimp, wheat, rice, pasta, oats, tomatoes, vegetables, legumes, nuts, oils, coffee, chocolate',
  },
  {
    key: 'owid2020',
    citation:
      'Ritchie, H. & Roser, M. (2020). Environmental Impacts of Food Production. Our World in Data.',
    doi: 'https://ourworldindata.org/food-choice-vs-eating-local',
    description:
      'Derived from Poore & Nemecek, provides accessible summaries and some additional food items. Used for turkey, tuna (canned), and tropical fruit where Poore & Nemecek data was interpolated from related categories.',
    usedFor: 'Turkey, tuna (canned), tropical fruit',
  },
  {
    key: 'clark2022',
    citation:
      'Clark, M.A. et al. (2022). Global food system emissions could preclude achieving the 1.5° and 2°C climate change targets. Science, 370(6517), 705–708.',
    doi: 'https://doi.org/10.1126/science.aba7357',
    description:
      'Used for cross-validation of poultry and processed food figures, and for country-level context comparisons.',
    usedFor: 'Cross-validation of poultry values',
  },
  {
    key: 'oatly2019',
    citation:
      'Oatly AB (2019). Oatly Climate Report. Gothenburg: Oatly AB.',
    doi: 'https://www.oatly.com/sustainability',
    description:
      'Used for oat milk emission factor (0.9 kg CO₂eq/L), consistent with Poore & Nemecek oat data.',
    usedFor: 'Oat milk',
  },
  {
    key: 'smetana2015',
    citation:
      'Smetana, S. et al. (2015). LCA of conventional and novel insect-based meat products. Journal of Cleaner Production, 94, 200–210.',
    doi: 'https://doi.org/10.1016/j.jclepro.2015.01.014',
    description:
      'Used for tempeh emission estimate, cross-validated with soybean factors from Poore & Nemecek.',
    usedFor: 'Tempeh',
  },
];

const CALC_STEPS = [
  {
    step: '1. Ingredient weight',
    detail: 'Each meal template specifies the approximate weight in grams of each ingredient per serving. Portion sizes are based on USDA food pattern equivalents and NHS Eatwell Guide recommendations.',
    formula: null,
  },
  {
    step: '2. Convert to kg',
    detail: 'Grams are converted to kilograms, multiplied by the servings count.',
    formula: 'kg_food = grams × servings ÷ 1000',
  },
  {
    step: '3. Apply emission factor',
    detail: 'The mean emission factor (kg CO₂eq per kg food) from Poore & Nemecek is applied. This factor represents the full supply-chain footprint from land use change through to retail.',
    formula: 'kg_CO₂eq = kg_food × emission_factor',
  },
  {
    step: '4. Uncertainty range',
    detail: 'The 5th–95th percentile range from Poore & Nemecek Figure 1 is applied to give a low/high bound for each ingredient. This reflects variance across >38,000 real-world farms.',
    formula: 'range = kg_food × [low_factor, high_factor]',
  },
  {
    step: '5. Aggregate',
    detail: 'Individual ingredient values are summed across the meal, then across the full week. Annual figures are extrapolated by multiplying weekly totals by 52.',
    formula: 'weekly_total = Σ(meal emissions); annual = weekly × 52',
  },
  {
    step: '6. Plant-based comparison',
    detail: 'Each non-plant-based meal is mapped to a closest plant-based equivalent (e.g., beef burger → black bean burger). The same calculation is applied to both and results compared side-by-side.',
    formula: 'saving = current_meal_CO₂ − plant_based_meal_CO₂',
  },
];

const SCOPE_NOTE = `
Emission factors cover the full supply chain from farm to retail. This includes:
• Land use change (e.g. deforestation for pasture or soy feed)
• On-farm operations (enteric fermentation, manure, fertilizer)
• Animal feed production
• Processing and manufacturing
• Domestic transport and packaging

Not included: emissions from cooking, waste disposal, or consumer transport to shops.
These typically add 5–15% to total food system emissions.
`.trim();

export default function MethodologyPage() {
  const ingredients = Object.values(INGREDIENTS).sort((a, b) =>
    b.emissionsPerKg - a.emissionsPerKg
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Methodology & Data Sources</h1>
        <p className="text-gray-600">
          CarbonPlate is designed to be <strong>transparent and citable</strong>. This page documents
          exactly how emission figures are calculated, which data sources are used, and what is and
          isn&apos;t included in the scope.
        </p>
      </div>

      {/* ── Primary source callout ── */}
      <section className="card bg-blue-50 border-blue-200">
        <h2 className="font-semibold text-blue-900 mb-2 text-lg">Primary Data Source</h2>
        <p className="text-blue-800 mb-3">
          All core emission factors come from the largest food lifecycle assessment meta-analysis
          ever conducted:
        </p>
        <blockquote className="border-l-4 border-blue-400 pl-4 text-blue-900 font-medium text-sm">
          Poore, J. &amp; Nemecek, T. (2018). <em>Reducing food&apos;s environmental impacts through
          producers and consumers.</em> Science, 360(6392), 987–992.{' '}
          <a
            href="https://www.science.org/doi/10.1126/science.aao0216"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            doi:10.1126/science.aao0216
          </a>
        </blockquote>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-center">
          {[
            { n: '570', label: 'studies reviewed' },
            { n: '>38,000', label: 'farms assessed' },
            { n: '119', label: 'countries covered' },
          ].map(({ n, label }) => (
            <div key={label} className="bg-blue-100 rounded-lg p-3">
              <p className="text-xl font-bold text-blue-800">{n}</p>
              <p className="text-xs text-blue-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scope ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-3 text-lg">What&apos;s Included in the Scope</h2>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-lg p-4 font-sans">
          {SCOPE_NOTE}
        </pre>
      </section>

      {/* ── Calculation steps ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">Calculation Methodology</h2>
        <div className="space-y-4">
          {CALC_STEPS.map(({ step, detail, formula }) => (
            <div key={step} className="flex gap-4">
              <div className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {step.split('.')[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{step.split('. ')[1]}</p>
                <p className="text-sm text-gray-600 mt-0.5">{detail}</p>
                {formula && (
                  <code className="mt-1 block text-xs bg-gray-100 px-3 py-1.5 rounded text-gray-800 font-mono">
                    {formula}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── All sources ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">All Data Sources</h2>
        <div className="space-y-4">
          {SOURCES.map(src => (
            <div key={src.key} className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800 text-sm">{src.citation}</p>
              <a
                href={src.doi}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 underline mt-0.5 block"
              >
                {src.doi}
              </a>
              <p className="text-sm text-gray-600 mt-2">{src.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                <strong>Used for:</strong> {src.usedFor}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full emission factors table ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-2 text-lg">
          Complete Emission Factors Table
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          All values in kg CO₂eq per kg of food (farm-to-retail). Sorted by mean emission factor.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Food</th>
                <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mean</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Low (5th %ile)</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">High (95th %ile)</th>
                <th className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Source</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(ing => {
                const cat = CATEGORIES[ing.category];
                return (
                  <tr key={ing.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: ing.color || '#94a3b8' }}
                        />
                        <span className="font-medium text-gray-800 text-xs">{ing.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-xs text-gray-500">
                      {cat?.icon} {cat?.label || ing.category}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-gray-900 text-xs">
                      {ing.emissionsPerKg}
                    </td>
                    <td className="py-2 px-2 text-right text-xs text-gray-500">{ing.low}</td>
                    <td className="py-2 px-2 text-right text-xs text-gray-500">{ing.high}</td>
                    <td className="py-2 px-2 text-xs text-gray-400 hidden sm:table-cell max-w-xs truncate">
                      {ing.source}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          All values: kg CO₂eq / kg food. Mean values from Poore &amp; Nemecek (2018) Table S2 / Figure 1
          unless otherwise noted.
        </p>
      </section>

      {/* ── Limitations ── */}
      <section className="card border-orange-200 bg-orange-50">
        <h2 className="font-semibold text-orange-900 mb-3 text-lg">
          ⚠️ Limitations & Caveats
        </h2>
        <ul className="text-sm text-orange-800 space-y-2 list-disc list-inside">
          <li>
            <strong>Global averages:</strong> Emission factors represent global mean values. Local or
            certified (organic, regenerative) production may differ significantly — sometimes better,
            sometimes worse.
          </li>
          <li>
            <strong>Not per-calorie:</strong> Values are per kg of food, not per calorie or gram of
            protein. High-water vegetables look worse on a per-calorie basis than on a per-kg basis.
          </li>
          <li>
            <strong>Cooking excluded:</strong> Energy used for cooking is not included. This adds
            roughly 5–15% to total household food emissions.
          </li>
          <li>
            <strong>Portion sizes are approximate:</strong> Meal templates use typical serving
            weights. Real portions vary by individual.
          </li>
          <li>
            <strong>Air freight not separated:</strong> Out-of-season or air-freighted produce
            (e.g. asparagus from Peru, berries by air) can have 30–50× higher transport emissions.
            This tool uses global averages.
          </li>
          <li>
            <strong>Data vintage:</strong> Poore &amp; Nemecek (2018) remains the most comprehensive
            study but was published in 2018. Production practices have evolved.
          </li>
        </ul>
      </section>

      {/* ── How to cite ── */}
      <section className="card">
        <h2 className="font-semibold text-gray-800 mb-3 text-lg">
          📖 How to Cite in Advocacy Material
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          CarbonPlate results are suitable for citing in advocacy material, educational resources,
          and research when using the following format:
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 leading-relaxed">
          <p>
            Food carbon footprint calculated using CarbonPlate [tool], based on lifecycle assessment
            data from:
          </p>
          <p className="mt-2">
            Poore, J. &amp; Nemecek, T. (2018). <em>Reducing food&apos;s environmental impacts through
            producers and consumers.</em> Science, 360(6392), 987–992.
            doi:10.1126/science.aao0216.
          </p>
          <p className="mt-2 text-gray-500">
            [State your specific figures and note that they represent global mean estimates with
            substantial variation across production systems.]
          </p>
        </div>
      </section>
    </div>
  );
}
