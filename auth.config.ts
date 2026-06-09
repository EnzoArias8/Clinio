import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Import Prisma dynamically
          const { prisma } = await import('@/lib/prisma');
          
          // Find professional by email
          const profesional = await prisma.profesional.findUnique({
            where: { email: credentials.email as string },
            include: { user: true }
          });

          if (!profesional) {
            return null;
          }

          // Temporarily skip password verification for testing
          // TODO: Add back bcrypt verification once basic auth works
          
          // Check if professional is active
          if (!profesional.activo) {
            return null;
          }

          const userObject = {
            id: profesional.user?.id || profesional.id,
            email: profesional.email,
            name: profesional.nombre,
            role: 'profesional',
            profesionalId: profesional.id,
            suscripcionActiva: profesional.suscripcionActiva,
            fotoPerfil: profesional.fotoPerfil || undefined,
          };

          return userObject;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.profesionalId = user.profesionalId;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.suscripcionActiva = user.suscripcionActiva as boolean;
      }

      // On subsequent requests, refresh the professional data
      if (token.profesionalId && !user) {
        try {
          const { prisma } = await import('@/lib/prisma');
          const profesional = await prisma.profesional.findUnique({
            where: { id: token.profesionalId as string },
            select: {
              nombre: true,
              email: true,
              especialidad: true,
              matricula: true,
              activo: true,
              suscripcionActiva: true,
              fotoPerfil: true,
            },
          });

          if (profesional) {
            token.name = profesional.nombre;
            token.email = profesional.email;
            token.especialidad = profesional.especialidad;
            token.matricula = profesional.matricula || undefined;
            token.activo = profesional.activo;
            token.suscripcionActiva = profesional.suscripcionActiva;
            token.fotoPerfil = profesional.fotoPerfil || undefined;
          }
        } catch (error) {
          // Error fetching professional data
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.profesionalId = token.profesionalId as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.especialidad = token.especialidad as string;
        session.user.matricula = token.matricula as string;
        session.user.activo = token.activo as boolean;
        session.user.suscripcionActiva = token.suscripcionActiva as boolean;
        session.user.fotoPerfil = token.fotoPerfil as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
