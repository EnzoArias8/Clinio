import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      profesionalId: string;
      especialidad?: string;
      matricula?: string;
      activo?: boolean;
      suscripcionActiva?: boolean;
    };
  }

  interface User {
    role: string;
    profesionalId: string;
    name: string;
    email: string;
    especialidad?: string;
    matricula?: string;
    activo?: boolean;
    suscripcionActiva?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    profesionalId: string;
    name: string;
    email: string;
    especialidad?: string;
    matricula?: string;
    activo?: boolean;
    suscripcionActiva?: boolean;
  }
}
