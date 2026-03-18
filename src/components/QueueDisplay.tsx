import type { Person } from '../types';

interface PropiedadesDisplayCola {
  queue: Person[];
}

function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric'
  });
}

export function QueueDisplay({ queue }: PropiedadesDisplayCola) {
  if (queue.length === 0) {
    return (
      <div className="queue-section">
        <h2>Cola</h2>
        <p className="empty-message">No hay nadie en la cola</p>
      </div>
    );
  }

  return (
    <div className="queue-section">
      <h2>Cola ({queue.length})</h2>
      <table className="queue-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Retiro</th>
            <th>Hora de Llegada</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((person, index) => (
            <tr key={person.id}>
              <td className="position">{index + 1}</td>
              <td>{person.name}</td>
              <td className="amount">${person.withdrawalAmount.toFixed(2)}</td>
              <td className="time">
                {formatearFecha(person.arrivalDate)} {formatearHora(person.arrivalDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
