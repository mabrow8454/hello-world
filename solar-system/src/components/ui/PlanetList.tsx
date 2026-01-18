import { useNavigate } from 'react-router-dom';
import { PLANETS, PLANET_ORDER } from '@/data/planets';
import { useAppStore } from '@/store/appStore';
import './PlanetList.css';

export function PlanetList() {
  const { selectedPlanet, setSelectedPlanet } = useAppStore();
  const navigate = useNavigate();

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
    navigate(`/planet/${planetId}`);
  };

  const handleHomeClick = () => {
    setSelectedPlanet(null);
    navigate('/');
  };

  return (
    <div className="planet-list">
      <div className="planet-list-header">
        <h1>Solar System Explorer</h1>
        <button onClick={handleHomeClick} className="home-button">
          ⌂ Overview
        </button>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search planets..." />
      </div>

      <div className="planet-items">
        {PLANET_ORDER.map((planetId) => {
          const planet = PLANETS[planetId];
          const isSelected = selectedPlanet === planetId;

          return (
            <button
              key={planetId}
              className={`planet-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handlePlanetClick(planetId)}
            >
              <div
                className="planet-color"
                style={{ backgroundColor: planet.color }}
              />
              <div className="planet-details">
                <div className="planet-name">{planet.name}</div>
                <div className="planet-distance">{planet.distance.toFixed(2)} AU</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
