export interface Vehiculo {
  id: number
  modelo: string
  placa: string
  disponible: boolean
}

export interface RegistroAlquiler {
  vehiculoId: number
  modelo: string
  placa: string
  alquiladoEn: Date
}

export interface Inversionista {
  id: number
  nombre: string
  activo: boolean
}
