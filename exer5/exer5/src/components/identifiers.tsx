import React from 'react';
import './identifiers.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface IdentifiersProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const Identifiers: React.FC<IdentifiersProps> = ({ pokemon, loading, error }) => {
  if (loading) {
    return (
      <div className="spriteLoc">
        <div>Loading Pokemon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="spriteLoc">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="spriteLoc">
        <div>No Pokemon selected</div>
      </div>
    );
  }

  return (
    <div className="spriteLoc">
      <div className="pokemon-sprite">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="pokemon-name">
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>#{pokemon.id.toString().padStart(3, '0')}</p>
      </div>
    </div>
  );
};

export default Identifiers;
