import { useState } from 'react';
import type { Person } from '../types';

interface PersonFormProps {
  onAddPerson: (person: Person) => void;
}

export function PersonForm({ onAddPerson }: PersonFormProps) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !cantidad.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const montoRetiro = parseFloat(cantidad);
    if (montoRetiro <= 0) {
      alert('La cantidad a retirar debe ser mayor a 0');
      return;
    }

    const nuevaPersona: Person = {
      id: Math.random().toString(36).substring(7),
      name: nombre.trim(),
      withdrawalAmount: montoRetiro,
      arrivalDate: new Date()
    };

    onAddPerson(nuevaPersona);
    setNombre('');
    setCantidad('');
  };

  return (
    <form onSubmit={manejarEnvio} className="form-section">
      <h2>Agregar Persona</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Cantidad a Retirar:</label>
        <input
          id="amount"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ingresa la cantidad"
          min="0.01"
          step="0.01"
        />
      </div>
      <button type="submit">Agregar a la Cola</button>
    </form>
  );
}
