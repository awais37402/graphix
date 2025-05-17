import { useState } from 'react';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('thumbnails');

  return (
    <div className="portfolio-app">
      <Hero />
      <PortfolioSection 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}

export default App;
