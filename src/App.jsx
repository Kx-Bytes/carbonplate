import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MealPlanBuilder from './pages/MealPlanBuilder.jsx';
import ResultsDashboard from './pages/ResultsDashboard.jsx';
import MethodologyPage from './pages/MethodologyPage.jsx';

export default function App() {
  const [plan, setPlan] = useState([]);
  const [customMeals, setCustomMeals] = useState({});

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <MealPlanBuilder
                  plan={plan}
                  setPlan={setPlan}
                  customMeals={customMeals}
                  setCustomMeals={setCustomMeals}
                />
              }
            />
            <Route
              path="/results"
              element={<ResultsDashboard plan={plan} customMeals={customMeals} />}
            />
            <Route path="/methodology" element={<MethodologyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
