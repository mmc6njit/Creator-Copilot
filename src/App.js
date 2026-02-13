import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Merch from './pages/Merch';
import ExpenseLedger from './pages/ExpenseLedger';
import TaxCenter from './pages/TaxCenter';
import Analytics from './pages/Analytics';
import './styles/App.css';
import logo from './assets/tapyoca_logo.jpeg';

// --- Central Data Store ---
const initialExpensesData = [
    { id: 1, date: '2025-11-17', vendor: 'Mixing Service', amount: 300.00, category: 'Production & Creation' },
    { id: 2, date: '2025-11-12', vendor: 'Facebook Ads', amount: 50.00, category: 'Marketing' },
    { id: 3, date: '2025-11-10', vendor: 'Guitar Center', amount: 1110.00, category: 'Studio Time' },
    { id: 4, date: '2025-11-01', vendor: 'T-Shirt Printing', amount: 540.00, category: 'Merchandise' },
];

const initialSalesData = [
    { id: 3, date: '2026-1-19', quantity: 5, total: 75.00 },
    { id: 2, date: '2026-1-18', quantity: 2, total: 30.00 },
    { id: 1, date: '2026-1-12', quantity: 10, total: 150.00 },
];


function App() {
  const [activePage, setActivePage] = useState('analytics');
  const [expenses, setExpenses] = useState(initialExpensesData);
  const [sales, setSales] = useState(initialSalesData);
  // NEW: State to hold the fetched recommendations
  const [recommendations, setRecommendations] = useState("Generating your fresh insights...");

  // --- Dynamic Analysis Logic ---
  const getStartOfWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const startOfWeek = getStartOfWeek();
  const weeklySpending = expenses.filter(e => new Date(e.date) >= startOfWeek).reduce((sum, e) => sum + e.amount, 0);
  const weeklyExpenses = expenses.filter(e => new Date(e.date) >= startOfWeek);
  const spendingByCategory = weeklyExpenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {});
  const mostExpensiveCategory = Object.keys(spendingByCategory).reduce((a, b) => spendingByCategory[a] > spendingByCategory[b] ? a : b, 'None');
  const weeklySales = sales.filter(s => new Date(s.date) >= startOfWeek);
  const tapyocaRevenue = weeklySales.reduce((sum, s) => sum + s.total, 0);
  const tapyocaListeners = weeklySales.reduce((sum, s) => sum + s.quantity, 0);
  const DUMMY_OTHER_INCOME = 1175.00;
  const weeklyProfit = (DUMMY_OTHER_INCOME + tapyocaRevenue) - weeklySpending;
  const profitToday = 150.00;

  const dynamicAnalyticsData = {
      artistName: "James", // Added artist name for the prompt
      weeklyProfit,
      profitToday,
      tapyocaRevenue,
      tapyocaListeners,
      weeklySpending,
      mostExpensiveCategory,
      budget: 1500.00,
  };

  // NEW: useEffect to fetch recommendations from Ollama ONCE
  useEffect(() => {
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ analyticsData: dynamicAnalyticsData }),
            });
            const data = await response.json();
            if (data.recommendationsText) {
                setRecommendations(data.recommendationsText);
            } else {
                setRecommendations("Could not generate recommendations at this time.");
            }
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
            setRecommendations("Could not connect to the recommendation service. Please ensure the backend server and Ollama are running.");
        }
    };
    fetchRecommendations();
  }, []); // Empty array ensures this runs only once when the app loads


  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'merch': return <Merch sales={sales} setSales={setSales} />;
      case 'expenses': return <ExpenseLedger expenses={expenses} setExpenses={setExpenses} />;
      case 'taxes': return <TaxCenter />;
      case 'analytics':
      default: return <Analytics analyticsData={dynamicAnalyticsData} recommendations={recommendations} />; // Pass recommendations down
    }
  };

  return (
    <div className="App">
      <nav className="main-nav">
        <img src={logo} alt="tapyoca Logo" className="main-logo" />
        <div>
          <button onClick={() => setActivePage('analytics')} className={activePage === 'analytics' ? 'active' : ''}>Insights</button>
          <button onClick={() => setActivePage('dashboard')} className={activePage === 'dashboard' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => setActivePage('merch')} className={activePage === 'merch' ? 'active' : ''}>Merch</button>
          <button onClick={() => setActivePage('expenses')} className={activePage === 'expenses' ? 'active' : ''}>Costs</button>
          <button onClick={() => setActivePage('taxes')} className={activePage === 'taxes' ? 'active' : ''}>Tax Hub</button>
        </div>
      </nav>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

