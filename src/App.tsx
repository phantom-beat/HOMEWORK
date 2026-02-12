import { useState, useEffect } from 'react'
import { Loader } from './components/Loader'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'
import type { Contact } from './components/ContactItem'
import './App.css'

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Juan Pérez', phone: '555-0101' },
  { id: '2', name: 'María García', phone: '555-0102' },
  { id: '3', name: 'Carlos López', phone: '555-0103' },
  { id: '4', name: 'Ana Martínez', phone: '555-0104' },
]

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga de datos inicial
  useEffect(() => {
    const loadContacts = async () => {
      // Simulamos un delay de 2 segundos para cargar los datos
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setContacts(INITIAL_CONTACTS)
      setIsLoading(false)
    }

    loadContacts()
  }, [])

  const handleAddContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
    }
    setContacts([...contacts, newContact])
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  return (
    <div className="app-container">
      <Loader isLoading={isLoading} />
      <header className="app-header">
        <h1>📇 Gestor de Contactos</h1>
        <p className="subtitle">Maneja tu lista de contactos de forma sencilla</p>
      </header>
      <main className="app-main">
        <ContactForm onSubmit={handleAddContact} />
        <section className="contacts-section">
          <h2>Contactos ({contacts.length})</h2>
          <ContactList contacts={contacts} onDelete={handleDeleteContact} />
        </section>
      </main>
    </div>
  )
}

export default App
