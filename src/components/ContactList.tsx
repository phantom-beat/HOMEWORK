import { type Contact, ContactItem } from './ContactItem'
import './ContactList.css'

export interface ContactListProps {
  contacts: Contact[]
  onDelete: (id: string) => void
}

export function ContactList({ contacts, onDelete }: ContactListProps) {
  if (contacts.length === 0) {
    return <p className="empty-list">No hay contactos. ¡Agrega uno nuevo!</p>
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
