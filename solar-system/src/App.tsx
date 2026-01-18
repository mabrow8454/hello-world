import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Scene } from './components/3d/Scene';
import { PlanetList } from './components/ui/PlanetList';
import { PlanetInfo } from './components/ui/PlanetInfo';
import { TimeControls } from './components/ui/TimeControls';
import { useAppStore } from './store/appStore';
import { PLANETS } from './data/planets';
import './App.css';

function PlanetRoute() {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();
  const { setSelectedPlanet } = useAppStore();

  useEffect(() => {
    if (planetId && PLANETS[planetId]) {
      setSelectedPlanet(planetId);
    } else if (planetId) {
      // Invalid planet ID, redirect to home
      navigate('/');
    }
  }, [planetId, setSelectedPlanet, navigate]);

  return null;
}

function HomeRoute() {
  const { setSelectedPlanet } = useAppStore();

  useEffect(() => {
    setSelectedPlanet(null);
  }, [setSelectedPlanet]);

  return null;
}

function AppContent() {
  const { setIsMobile } = useAppStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/planet/:planetId" element={<PlanetRoute />} />
      </Routes>

      <Scene />
      <PlanetList />
      <PlanetInfo />
      <TimeControls />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
