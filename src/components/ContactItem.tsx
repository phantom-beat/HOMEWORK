import './ContactItem.css'

export interface Contact {
  id: string
  name: string
  phone: string
}

export interface ContactItemProps {
  contact: Contact
  onDelete: (id: string) => void
}

export function ContactItem({ contact, onDelete }: ContactItemProps) {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <p className="contact-name">{contact.name}</p>
        <p className="contact-phone">{contact.phone}</p>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(contact.id)}
        aria-label={`Eliminar contacto de ${contact.name}`}
      >
        ✕
      </button>
    </div>
  )
}
