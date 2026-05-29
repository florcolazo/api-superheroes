import React from 'react';
import { Link } from 'react-router-dom';

const HeroCard = ({ hero }) => {
  const badgeClass = hero.casa === 'Marvel' ? 'badge-marvel' : 'badge-dc';

  return (
    <Link to={`/hero/${hero._id}`} className="card">
      <div className="card-img-container">
        <img 
          src={hero.imagenes[0]} 
          alt={hero.nombre} 
          className="card-img"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }}
        />
      </div>
      <div>
        <h2 className="card-title">{hero.nombre}</h2>
        {hero.nombreReal && <p className="card-subtitle">{hero.nombreReal}</p>}
      </div>
      <span className={`badge ${badgeClass}`}>{hero.casa}</span>
      <p className="card-bio">{hero.biografia}</p>
    </Link>
  );
};

export default HeroCard;
