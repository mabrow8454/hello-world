import { PLANETS } from '@/data/planets';
import { useAppStore } from '@/store/appStore';
import './PlanetInfo.css';

export function PlanetInfo() {
  const { selectedPlanet, showInfo, toggleInfo } = useAppStore();

  if (!selectedPlanet) return null;

  const planet = PLANETS[selectedPlanet];
  if (!planet) return null;

  return (
    <div className={`planet-info ${showInfo ? 'visible' : 'hidden'}`}>
      <div className="planet-info-header">
        <h2>{planet.name}</h2>
        <button onClick={toggleInfo} className="toggle-button">
          {showInfo ? '−' : '+'}
        </button>
      </div>

      {showInfo && (
        <div className="planet-info-content">
          <p className="planet-description">{planet.description}</p>

          <div className="planet-stats">
            <div className="stat">
              <div className="stat-label">Radius</div>
              <div className="stat-value">{planet.radius.toFixed(2)} × Earth</div>
            </div>

            <div className="stat">
              <div className="stat-label">Distance from Sun</div>
              <div className="stat-value">{planet.distance.toFixed(2)} AU</div>
            </div>

            <div className="stat">
              <div className="stat-label">Orbital Period</div>
              <div className="stat-value">{planet.orbitalPeriod.toFixed(0)} days</div>
            </div>

            <div className="stat">
              <div className="stat-label">Day Length</div>
              <div className="stat-value">{planet.rotationPeriod.toFixed(2)} Earth days</div>
            </div>
          </div>

          {planet.features?.atmosphere && (
            <div className="feature-badge">🌫️ Atmosphere</div>
          )}
          {planet.features?.rings && (
            <div className="feature-badge">💍 Rings</div>
          )}
          {planet.features?.clouds && (
            <div className="feature-badge">☁️ Clouds</div>
          )}
        </div>
      )}
    </div>
  );
}
