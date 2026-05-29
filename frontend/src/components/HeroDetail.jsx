import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from './ToastContext';
import HeroForm from './HeroForm';

const API_URL = 'http://localhost:5000/api/superheroes';

const HeroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToast = useToast();
  
  const [hero, setHero] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setHero(res.data);
      setCurrentImgIndex(0);
    } catch (err) {
      addToast('Error al cargar superhéroe', 'error');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchHero();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${hero.nombre}?`)) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        addToast('Superhéroe eliminado con éxito');
        navigate('/');
      } catch (err) {
        addToast('Error al eliminar', 'error');
      }
    }
  };

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % hero.imagenes.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + hero.imagenes.length) % hero.imagenes.length);
  };

  if (!hero) return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>Cargando...</div>;

  return (
    <div className="container">
      <div className="detail-container">
        <div className="carousel">
          <img 
            src={hero.imagenes[currentImgIndex]} 
            alt={`${hero.nombre} - ${currentImgIndex + 1}`} 
            className="carousel-img"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
          />
          {hero.imagenes.length > 1 && (
            <>
              <button className="carousel-btn prev" onClick={prevImg}>&#10094;</button>
              <button className="carousel-btn next" onClick={nextImg}>&#10095;</button>
            </>
          )}
        </div>
        
        <div className="detail-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{hero.nombre}</h1>
              {hero.nombreReal && <h3 style={{ color: 'var(--text-muted)' }}>{hero.nombreReal}</h3>}
            </div>
            <img 
              src={hero.casa === 'Marvel' ? 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' : 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg'} 
              alt={hero.casa} 
              className="house-logo"
            />
          </div>

          <div>
            <p><strong>Año de Aparición:</strong> {hero.añoAparicion || 'Desconocido'}</p>
            {hero.equipamiento && <p><strong>Equipamiento:</strong> {hero.equipamiento}</p>}
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Biografía</h4>
            <p style={{ lineHeight: '1.6', color: '#cbd5e1' }}>{hero.biografia || 'Sin biografía disponible.'}</p>
          </div>

          <div className="detail-actions">
            <button className="btn" onClick={() => navigate(-1)}>Volver</button>
            <button className="btn" style={{ background: '#f59e0b', marginLeft: 'auto' }} onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      </div>
      
      {isEditing && (
        <HeroForm 
          onClose={() => setIsEditing(false)} 
          heroToEdit={hero} 
          refreshData={fetchHero} 
        />
      )}
    </div>
  );
};

export default HeroDetail;
