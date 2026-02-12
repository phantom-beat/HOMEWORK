import './Loader.css'

export interface LoaderProps {
  isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>Cargando contactos...</p>
    </div>
  )
}
