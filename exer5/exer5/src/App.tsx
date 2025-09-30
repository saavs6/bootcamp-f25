import { useState, useEffect } from 'react'
import Identifiers from './components/identifiers'
import Types from './components/types'
import StatsPanel from './components/statsPanel'
import './App.css'

// Pokemon type definition
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

function App() {
  const title = "saavs' Pokedex"
  const [count, setCount] = useState(1)
  const [moves, setMoves] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Pokemon data
  const fetchPokemon = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      if (!response.ok) {
        throw new Error(`Pokemon with ID ${id} not found`);
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Pokemon when count changes
  useEffect(() => {
    if (count > 0) {
      fetchPokemon(count);
    }
  }, [count]);

  return (
    <>
      <div className="AppName">
        <h2>{title}</h2>
      </div>
      <div className="d">
        <div className="identifiers">
          <Identifiers pokemon={pokemon} loading={loading} error={error} />
          <Types pokemon={pokemon} loading={loading} />
        </div>
        <div className="statsPanel">
          <StatsPanel 
            pokemon={pokemon} 
            loading={loading} 
            error={error}
            activeTab={moves}
            onTabChange={setMoves}
          />
        </div>
      </div>
      <div className="card">
        <button 
          onClick={() => setCount((count) => Math.max(1, count - 1))}
          disabled={loading || count <= 1}
        >
           Previous
        </button>
        <button 
          onClick={() => setCount((count) => count + 1)}
          disabled={loading}
        >
           Next
        </button>
        <input 
          type = "number"
          className = "idin"
          placeholder = "enter pokemon id"
          min = {1}
          value = {count}
          onChange={(e) => {
            const v = parseInt(e.target.value || "0", 10);
            setCount(Math.max(1, isNaN(v) ? 1 : v)); // clamp to 1+, avoid NaN
          }}
        />
        <p>
          Pokemon ID: {count} {loading && "(Loading...)"}
        </p>
      </div>
      
    </>
  )
}

export default App
