import React from 'react';
import './statsPanel.css';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

interface StatsPanelProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  pokemon, 
  loading, 
  error, 
  activeTab, 
  onTabChange 
}) => {
  if (loading) {
    return (
      <div className="stats-panel">
        <div className="info">
          <div>Loading Pokemon data...</div>
        </div>
        <div className="tab-buttons">
          <button 
            className={activeTab === 0 ? 'active' : ''}
            onClick={() => onTabChange(0)}
          >
            Info
          </button>
          <button 
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => onTabChange(1)}
          >
            Moves
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-panel">
        <div className="info">
          <div>Error: {error}</div>
        </div>
        <div className="tab-buttons">
          <button 
            className={activeTab === 0 ? 'active' : ''}
            onClick={() => onTabChange(0)}
          >
            Info
          </button>
          <button 
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => onTabChange(1)}
          >
            Moves
          </button>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="stats-panel">
        <div className="info">
          <div>No Pokemon selected</div>
        </div>
        <div className="tab-buttons">
          <button 
            className={activeTab === 0 ? 'active' : ''}
            onClick={() => onTabChange(0)}
          >
            Info
          </button>
          <button 
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => onTabChange(1)}
          >
            Moves
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get stat by name
  const getStat = (statName: string) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  // Helper function to format height (API returns in decimeters)
  const formatHeight = (height: number) => {
    return (height / 10).toFixed(1) + 'm';
  };

  // Helper function to format weight (API returns in hectograms)
  const formatWeight = (weight: number) => {
    return (weight / 10).toFixed(1) + 'kg';
  };

  // Get first 20 moves for display
  const displayMoves = pokemon.moves.slice(0, 20);

  return (
    <div className="stats-panel">
      <div className="info">
        {activeTab === 0 ? (
          <div className="pokemon-info">
            <h3>Pokemon Info</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">HP:</span>
                <span className="info-value">{getStat('hp')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Attack:</span>
                <span className="info-value">{getStat('attack')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Defense:</span>
                <span className="info-value">{getStat('defense')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sp. Attack:</span>
                <span className="info-value">{getStat('special-attack')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sp. Defense:</span>
                <span className="info-value">{getStat('special-defense')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Speed:</span>
                <span className="info-value">{getStat('speed')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Height:</span>
                <span className="info-value">{formatHeight(pokemon.height)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight:</span>
                <span className="info-value">{formatWeight(pokemon.weight)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pokemon-moves">
            <h3>Pokemon Moves</h3>
            <div className="moves-list">
              {displayMoves.length > 0 ? (
                displayMoves.map((moveData, index) => {
                  const moveName = moveData?.move?.name || 'Unknown Move';
                  const formattedName = moveName.charAt(0).toUpperCase() + moveName.slice(1).replace(/-/g, ' ');
                  return (
                    <div key={index} className="move-item">
                      {formattedName}
                    </div>
                  );
                })
              ) : (
                <div className="move-item">No moves available</div>
              )}
              {pokemon.moves.length > 20 && (
                <div className="more-moves">
                  ... and {pokemon.moves.length - 20} more moves
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="tab-buttons">
        <button 
          className={activeTab === 0 ? 'active' : ''}
          onClick={() => onTabChange(0)}
        >
          Info
        </button>
        <button 
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => onTabChange(1)}
        >
          Moves
        </button>
      </div>
    </div>
  );
};

export default StatsPanel;
