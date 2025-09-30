import React from 'react';
import './types.css';

interface Pokemon {
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

interface TypesProps {
  pokemon: Pokemon | null;
  loading: boolean;
}

// Official Pokemon type colors
const typeColors: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const Types: React.FC<TypesProps> = ({ pokemon, loading }) => {
  if (loading) {
    return (
      <div className="types">
        <div>Loading types...</div>
      </div>
    );
  }

  if (!pokemon || !pokemon.types) {
    return (
      <div className="types">
        <div>No types available</div>
      </div>
    );
  }

  return (
    <div className="types">
      <div className="types-container">
        {pokemon.types.map((typeData, index) => {
          const typeName = typeData.type.name;
          const backgroundColor = typeColors[typeName] || '#A8A878'; // fallback to normal color
          
          return (
            <span
              key={index}
              className="type-badge"
              style={{ backgroundColor }}
            >
              {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Types;
