import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import HeroCard from './HeroCard';
import HeroForm from './HeroForm';
import { useToast } from './ToastContext';

const API_URL = 'http://localhost:5000/api/superheroes';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const location = useLocation();
  const addToast = useToast();

  const fetchHeroes = async () => {
    try {
      const res = await axios.get(API_URL);
      setHeroes(res.data);
    } catch (err) {
      addToast('Error al cargar superhéroes', 'error');
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  let filteredHeroes = heroes;
  
  if (location.pathname === '/marvel') {
    filteredHeroes = filteredHeroes.filter(h => h.casa === 'Marvel');
  } else if (location.pathname === '/dc') {
    filteredHeroes = filteredHeroes.filter(h => h.casa === 'DC');
  }

  if (searchTerm) {
    filteredHeroes = filteredHeroes.filter(h => 
      h.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar superhéroe por nombre..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn" onClick={() => setIsAdding(true)}>+ Nuevo Superhéroe</button>
      </div>

      {filteredHeroes.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
          <h3>No se encontraron superhéroes</h3>
        </div>
      ) : (
        <div className="grid">
          {filteredHeroes.map(hero => (
            <HeroCard key={hero._id} hero={hero} />
          ))}
        </div>
      )}

      {isAdding && (
        <HeroForm 
          onClose={() => setIsAdding(false)} 
          refreshData={fetchHeroes} 
        />
      )}
    </div>
  );
};

export default HeroList;
