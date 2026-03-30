# 🌍 CarbonPlate — Food Carbon Footprint Comparator

A web app that calculates the carbon footprint of your weekly meal plan, breaks it down by meal, ingredient, and production method, and compares it side-by-side with a plant-based equivalent.

**Data is accurate enough to cite in advocacy material**, using [Poore & Nemecek (2018)](https://doi.org/10.1126/science.aao0216) as the primary source — the largest food lifecycle assessment meta-analysis ever conducted.

---

## What It Does

| Feature | Detail |
|---|---|
| **Weekly meal planner** | 7-day × 4-meal-type grid; 30+ pre-built meal templates |
| **Carbon breakdown** | Per ingredient, per meal, per day, per category |
| **Plant-based comparison** | Automatic equivalent substitution (beef burger → black bean burger, etc.) |
| **Uncertainty ranges** | 5th–95th percentile from Poore & Nemecek Fig. 1 |
| **Export** | PNG image, print/PDF, copy-to-clipboard stats + citation |
| **Methodology page** | Full emission factors table, calculation steps, limitations, citation guide |

---

## Who Is This For

- **Environmental advocates** — export charts and stats for campaigns
- **Researchers & students** — citable figures with transparent methodology
- **Educators** — pre-loaded example plan shows the scale of diet impact immediately
- **Curious individuals** — understand the real cost of your food choices

---

## Product Thinking

Most carbon tools treat "food" as a single category. The reality is a beef steak has ~120× the emissions of lentils per kg. This tool makes that variance visceral and personal — you see *your* meals, broken down *by ingredient*, compared to *a specific alternative*. The plant-based comparison is not abstract ("eat less meat") but concrete ("your Tuesday spaghetti bolognese: 9.3 kg CO₂eq → lentil bolognese: 1.1 kg CO₂eq, saving 88%").

The shareable output and transparent methodology make it useful beyond personal reflection — as advocacy material or in research supporting dietary policy.

---

## Data Sources & Methodology

### Primary Source

> **Poore, J. & Nemecek, T. (2018).** *Reducing food's environmental impacts through producers and consumers.* Science, 360(6392), 987–992. [doi:10.1126/science.aao0216](https://doi.org/10.1126/science.aao0216)

- 570 lifecycle assessment studies reviewed  
- >38,000 farms assessed  
- 119 countries  
- 40 food products  
- Full supply-chain scope: land use change → farming → processing → transport → packaging

### Calculation Method

```
1. Ingredient weight:  grams per serving (from meal template)
2. Convert to kg:      kg_food = grams × servings ÷ 1000
3. Apply factor:       kg_CO₂eq = kg_food × emission_factor (kg CO₂eq/kg food)
4. Uncertainty:        range = kg_food × [5th_percentile, 95th_percentile]
5. Aggregate:          weekly = Σ(all meals); annual = weekly × 52
6. Comparison:         saving = current_meal − plant_based_equivalent
```

### Key Emission Factors (kg CO₂eq / kg food, mean)

| Food | kg CO₂eq/kg | Source |
|---|---|---|
| Beef (beef herd) | 59.6 | Poore & Nemecek 2018, Table S2 |
| Shrimp (farmed) | 26.9 | Poore & Nemecek 2018, Table S2 |
| Lamb & Mutton | 24.0 | Poore & Nemecek 2018, Table S2 |
| Cheese | 21.2 | Poore & Nemecek 2018, Table S2 |
| Dark chocolate | 18.7 | Poore & Nemecek 2018, Table S2 |
| Coffee | 17.0 | Poore & Nemecek 2018, Table S2 |
| Salmon (farmed) | 11.9 | Poore & Nemecek 2018 |
| Pork | 7.6 | Poore & Nemecek 2018, Table S2 |
| Chicken | 5.7 | Poore & Nemecek 2018, Table S2 |
| Eggs | 4.5 | Poore & Nemecek 2018, Table S2 |
| Rice | 4.0 | Poore & Nemecek 2018, Table S2 |
| Dairy milk | 3.2 | Poore & Nemecek 2018, Table S2 |
| Tofu | 3.0 | Derived from Poore & Nemecek |
| Legumes | 0.9 | Poore & Nemecek 2018, Table S2 |
| Root vegetables | 0.4 | Poore & Nemecek 2018, Table S2 |

Full table with uncertainty ranges: see app's Methodology page or `src/data/emissions.js`.

### What's Included in Scope

✅ Land use change (deforestation for pasture/feed crops)  
✅ On-farm operations (enteric fermentation, manure, fertilizer)  
✅ Animal feed production  
✅ Food processing and manufacturing  
✅ Transport and packaging (to retail)  

❌ Cooking energy (adds ~5–15%)  
❌ Food waste emissions  
❌ Consumer transport to shops  

### Limitations

- **Global averages**: Figures are global means. Local, organic, or regenerative production varies substantially.
- **Per-kg, not per-calorie**: High-water vegetables appear worse on a per-calorie basis than in dietary terms.
- **Air freight not separated**: Out-of-season air-freighted produce can be 30–50× higher than the average shown.
- **2018 data**: Poore & Nemecek remains the most comprehensive study but was published in 2018.

---

## How to Cite

When using CarbonPlate outputs in advocacy material or research:

> Food carbon footprint calculated using CarbonPlate, based on lifecycle assessment data from:
>
> Poore, J. & Nemecek, T. (2018). *Reducing food's environmental impacts through producers and consumers.* Science, 360(6392), 987–992. doi:10.1126/science.aao0216.
>
> [State your specific figures. Note they represent global mean estimates with substantial variation across production systems (5th–95th percentile ranges provided).]

---

## Getting Started

```bash
git clone https://github.com/<your-username>/carbonplate.git
cd carbonplate
npm install
npm run dev        # Development server → http://localhost:5173
npm run build      # Production build → dist/
```

Requires Node.js 18+.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Export | html2canvas + browser print |
| Routing | React Router v6 |
| Data | Static JS (no backend needed) |

---

## Project Structure

```
src/
  data/
    emissions.js          ← Emission factors (Poore & Nemecek 2018) — 30 ingredients
    meals.js              ← 30+ meal templates with ingredient weights
  utils/
    calculations.js       ← Carbon math: per-meal, weekly, plant-based comparison
    formatters.js         ← Display helpers
  components/
    Header.jsx
    WeeklyCalendar.jsx    ← 7-day meal grid (desktop table + mobile cards)
    MealSelectorModal.jsx ← Meal picker with live emissions preview
    EmissionsBarChart.jsx ← Daily comparison + total comparison charts
    CategoryPieChart.jsx  ← Emissions by food category
    MealComparisonTable.jsx
    IngredientBreakdownTable.jsx
    ExportPanel.jsx       ← PNG / Print / Copy-citation export
  pages/
    MealPlanBuilder.jsx   ← Main planner
    ResultsDashboard.jsx  ← Analysis, charts, comparison
    MethodologyPage.jsx   ← Full data sources & citation guide
```

---

## Design Decisions

**Why no backend?** All calculations are deterministic from static, versioned data. A backend adds complexity with no benefit.

**Why per-kg not per-calorie?** Poore & Nemecek report per-kg figures — this stays close to the citable source. Per-calorie would require nutritional data and make vegetables appear worse than they are in dietary terms.

**Why mean values?** Ranges are shown in the uncertainty band but headlines use means — consistent with how the paper presents and how it's cited in subsequent research.

**Why these plant-based equivalents?** Each was chosen to be a realistic, commonly available, nutritionally comparable substitute — not an exotic replacement. The goal is to show what a practical diet shift looks like.

---
