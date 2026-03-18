import { useState } from 'react'
import type { Person } from './types'
import { generarDatos, ordenarPorFechaLlegada } from './utils/queue'
import { QueueData } from './utils/QueueData'
import { PersonForm } from './components/PersonForm'
import { QueueDisplay } from './components/QueueDisplay'
import './App.css'

function App() {
  const [cola, setQueueData] = useState<QueueData<Person>>(() => {
    const q = new QueueData<Person>();
    generarDatos().forEach(persona => q.enqueue(persona));
    return q;
  })

  const manejarAgregarPersona = (persona: Person) => {
    const nuevaCola = new QueueData<Person>();
    cola.getItems().forEach(p => nuevaCola.enqueue(p));
    nuevaCola.enqueue(persona);
    
    const elementosOrdenados = ordenarPorFechaLlegada(nuevaCola.getItems());
    const colaOrdenada = new QueueData<Person>();
    elementosOrdenados.forEach(p => colaOrdenada.enqueue(p));
    
    setQueueData(colaOrdenada);
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>ATM</h1>
      </header>

      <main className="main-content">
        <PersonForm onAddPerson={manejarAgregarPersona} />
        <QueueDisplay queue={ordenarPorFechaLlegada(cola.getItems())} />
      </main>
    </div>
  )
}

export default App
