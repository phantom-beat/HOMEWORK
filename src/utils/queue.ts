import type { Person } from '../types';

export function generarDatos(): Person[] {
  const nombres = [
    'Carlos García',
    'María López',
    'Juan Rodríguez',
    'Ana Martínez',
    'Pedro Sánchez',
    'Laura Fernández',
    'Diego Pérez',
    'Isabel Gómez',
    'Francisco Ruiz',
    'Rosa Jiménez'
  ];

  const datosPersonas: Person[] = [];
  
  for (let i = 0; i < 5; i++) {
    const haciaAtras = Math.floor(Math.random() * 24);
    const minutosAtras = Math.floor(Math.random() * 60);
    const fechaLlegada = new Date();
    fechaLlegada.setHours(fechaLlegada.getHours() - haciaAtras);
    fechaLlegada.setMinutes(fechaLlegada.getMinutes() - minutosAtras);

    datosPersonas.push({
      id: Math.random().toString(36).substring(7),
      name: nombres[i],
      withdrawalAmount: Math.floor(Math.random() * 5000) + 100,
      arrivalDate: fechaLlegada
    });
  }

  return datosPersonas;
}

export function ordenarPorFechaLlegada(personas: Person[]): Person[] {
  return [...personas].sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime());
}
