import { useState, useEffect } from "react";
import { HarvestProvider, useHarvest } from "./context/HarvestContext";
import GainCard from "./components/GainCard";
import HoldingsTable from "./components/HoldingsTable";
import ImportantNotes from "./components/ImportantNotes";

import "./App.css";

const AppContent = () => {
  const { preHarvest, afterHarvest, holdings } = useHarvest();
  const [theme, setTheme] = useState('dark');

  const savings = preHarvest.realised - afterHarvest.realised;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <main style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '20px', margin: 0 }}>Tax Optimisation</h1>
          <div className="tooltip-container" style={{ display: 'inline-block' }}>
            <a href="#" style={{ color: '#2b6aff', textDecoration: 'underline', fontSize: '13px' }}>How it works?</a>
            <div className="tooltip-text">
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>See your capital gains for FY 2024-25 in the left card</li>
                <li style={{ marginTop: '8px' }}>Check boxes for assets you plan on selling to reduce your tax liability</li>
                <li style={{ marginTop: '8px' }}>Instantly see your updated tax liability in the right card</li>
              </ul>
              <div style={{ marginTop: '16px' }}>
                <strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid var(--table-border)',
            backgroundColor: 'var(--card-dark-bg)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <ImportantNotes />

      <section className="gain-cards" style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <GainCard 
          title="Pre Harvesting" 
          isAfter={false} 
          data={preHarvest} 
        />
        <GainCard 
          title="After Harvesting" 
          isAfter={true} 
          data={afterHarvest} 
          savings={savings}
        />
      </section>

      <section className="holdings-section">
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Holdings</h2>
        <HoldingsTable holdings={holdings} />
      </section>
    </main>
  );
};

const App = () => (
  <HarvestProvider>
    <AppContent />
  </HarvestProvider>
);

export default App;
