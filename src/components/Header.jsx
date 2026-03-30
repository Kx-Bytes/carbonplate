import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Meal Planner' },
  { to: '/results', label: 'Results' },
  { to: '/methodology', label: 'Methodology' },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
          <span className="text-2xl">🌍</span>
          <span>
            <span className="text-green-600">Carbon</span>Plate
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
