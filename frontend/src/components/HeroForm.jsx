import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const API_URL = 'http://localhost:5000/api/superheroes';

const HeroForm = ({ onClose, heroToEdit, refreshData }) => {
  const addToast = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    nombreReal: '',
    añoAparicion: '',
    casa: 'Marvel',
    biografia: '',
    equipamiento: '',
    imagenes: ''
  });

  useEffect(() => {
    if (heroToEdit) {
      setFormData({
        ...heroToEdit,
        imagenes: heroToEdit.imagenes.join(', ')
      });
    }
  }, [heroToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      añoAparicion: formData.añoAparicion ? parseInt(formData.añoAparicion) : null,
      imagenes: formData.imagenes.split(',').map(url => url.trim()).filter(url => url)
    };

    if (payload.imagenes.length === 0) {
      addToast('Debe incluir al menos una imagen', 'error');
      return;
    }

    try {
      if (heroToEdit) {
        await axios.put(`${API_URL}/${heroToEdit._id}`, payload);
        addToast('Superhéroe actualizado con éxito');
      } else {
        await axios.post(API_URL, payload);
        addToast('Superhéroe creado con éxito');
      }
      refreshData();
      onClose();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{heroToEdit ? 'Editar Superhéroe' : 'Nuevo Superhéroe'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Nombre *</label>
            <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Nombre Real</label>
            <input type="text" name="nombreReal" value={formData.nombreReal || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Año de Aparición</label>
            <input type="number" name="añoAparicion" value={formData.añoAparicion || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Casa *</label>
            <select name="casa" value={formData.casa} onChange={handleChange}>
              <option value="Marvel">Marvel</option>
              <option value="DC">DC</option>
            </select>
          </div>
          <div className="form-group">
            <label>Biografía</label>
            <textarea name="biografia" value={formData.biografia || ''} onChange={handleChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Equipamiento</label>
            <input type="text" name="equipamiento" value={formData.equipamiento || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>URLs de Imágenes (separadas por coma) *</label>
            <input required type="text" name="imagenes" value={formData.imagenes} onChange={handleChange} placeholder="https://..., https://..." />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn" style={{ flex: 1 }}>Guardar</button>
            <button type="button" className="btn btn-danger" style={{ flex: 1 }} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroForm;
