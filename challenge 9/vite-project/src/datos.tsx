import type { ElementoMenu } from './tipos';

const Inicio = () => <div>Contenido: Inicio</div>;
const Mensajes = () => <div>Contenido: Mensajes</div>;
const Configuración = () => <div>Contenido: Configuración</div>;
const Cuenta = () => <div>Contenido: Cuenta</div>;
const Perfil = () => <div>Contenido: Perfil</div>;
const Seguridad = () => <div>Contenido: Seguridad & Privacidad</div>;
const Contraseña = () => <div>Contenido: Contraseña</div>;
const Notificación = () => <div>Contenido: Notificación</div>;
const Preguntas = () => <div>Contenido: Preguntas Frecuentes</div>;
const Soporte = () => <div>Contenido: Enviar Ticket</div>;
const Estado = () => <div>Contenido: Estado de Red</div>;
const Cerrar = () => <div>Contenido: Sesión Cerrada</div>;

export const arbolMenu: ElementoMenu[] = [
  {
    id: 'inicio',
    titulo: 'Inicio',
    enlace: '/',
    componente: Inicio
  },
  {
    id: 'perfil',
    titulo: 'Perfil',
    hijos: [
      {
        id: 'mensajes',
        titulo: 'Mensajes',
        enlace: '/mensajes',
        componente: Mensajes
      },
      {
        id: 'config',
        titulo: 'Configuración',
        enlace: '/config',
        componente: Configuración
      },
      {
        id: 'cuenta',
        titulo: 'Cuenta',
        enlace: '/cuenta',
        componente: Cuenta
      },
      {
        id: 'perfil-det',
        titulo: 'Perfil',
        enlace: '/perfil',
        componente: Perfil
      },
      {
        id: 'seguridad',
        titulo: 'Seguridad & Privacidad',
        enlace: '/seguridad',
        componente: Seguridad
      },
      {
        id: 'contrasena',
        titulo: 'Contraseña',
        enlace: '/contrasena',
        componente: Contraseña
      },
      {
        id: 'notificacion',
        titulo: 'Notificación',
        enlace: '/notificacion',
        componente: Notificación
      }
    ]
  },
  {
    id: 'ayuda',
    titulo: 'Ayuda',
    hijos: [
      {
        id: 'faqs',
        titulo: 'Preguntas Frecuentes',
        enlace: '/faqs',
        componente: Preguntas
      },
      {
        id: 'soporte',
        titulo: 'Enviar Ticket',
        enlace: '/soporte',
        componente: Soporte
      },
      {
        id: 'estado',
        titulo: 'Estado de Red',
        enlace: '/estado',
        componente: Estado
      }
    ]
  },
  {
    id: 'cerrar',
    titulo: 'Cerrar Sesión',
    enlace: '/logout',
    componente: Cerrar
  }
];
