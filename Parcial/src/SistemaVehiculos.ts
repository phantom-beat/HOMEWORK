import { ListaEnlazada } from './estructuras/ListaEnlazada';
import { ListaDobleEnlazada } from './estructuras/ListaDobleEnlazada';
import { ListaCircular } from './estructuras/ListaCircular';
import { ListaCircularDobleEnlazada } from './estructuras/ListaCircularDobleEnlazada';
import type { Vehiculo, RegistroAlquiler, Inversionista } from './tipos';

export class SistemaVehiculos {
  vehiculosDisponibles: ListaEnlazada<Vehiculo>;
  historialAlquileres: ListaDobleEnlazada<RegistroAlquiler>;
  vehiculosDestacados: ListaCircular<Vehiculo>;
  inversionistasActivos: ListaCircularDobleEnlazada<Inversionista>;

  constructor() {
    this.vehiculosDisponibles = new ListaEnlazada();
    this.historialAlquileres = new ListaDobleEnlazada();
    this.vehiculosDestacados = new ListaCircular();
    this.inversionistasActivos = new ListaCircularDobleEnlazada();
  }

  agregarVehiculo(vehiculo: Vehiculo): void {
    this.vehiculosDisponibles.agregar(vehiculo);
    this.vehiculosDestacados.agregar(vehiculo);
  }

  alquilarVehiculo(vehiculoId: number): boolean {
    const vehiculos = this.vehiculosDisponibles.aArray();
    const vehiculo = vehiculos.find(v => v.id === vehiculoId);

    if (vehiculo) {
      this.vehiculosDisponibles.eliminar(v => v.id === vehiculoId);

      const registro: RegistroAlquiler = {
        vehiculoId: vehiculo.id,
        modelo: vehiculo.modelo,
        placa: vehiculo.placa,
        alquiladoEn: new Date()
      };
      this.historialAlquileres.agregar(registro);

      return true;
    }
    return false;
  }

  agregarInversionista(inversionista: Inversionista): void {
    this.inversionistasActivos.agregar(inversionista);
  }

  obtenerSiguienteVehiculoDestacado(): Vehiculo | null {
    return this.vehiculosDestacados.obtenerSiguiente();
  }

  obtenerSiguienteInversionista(): Inversionista | null {
    return this.inversionistasActivos.obtenerSiguiente();
  }

  obtenerVehiculosDisponibles(): Vehiculo[] {
    return this.vehiculosDisponibles.aArray();
  }

  obtenerHistorialAlquileres(): RegistroAlquiler[] {
    return this.historialAlquileres.aArray();
  }

  obtenerTodosLosInversionistas(): Inversionista[] {
    return this.inversionistasActivos.aArray();
  }

  obtenerTodosLosVehiculosDestacados(): Vehiculo[] {
    return this.vehiculosDestacados.aArray();
  }
}
