import { useState } from 'react'
import './ContactForm.css'

export interface ContactFormProps {
  onSubmit: (name: string, phone: string) => void
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    onSubmit(name, phone)
    setName('')
    setPhone('')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Contacto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa el nombre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingresa el teléfono"
        />
      </div>
      <button type="submit" className="submit-btn">
        Agregar Contacto
      </button>
    </form>
  )
}
